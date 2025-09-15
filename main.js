function loadSection(name) {
  fetch(`sections/${name}.html`)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Replace main content
      const content = doc.body.innerHTML;
      document.getElementById('main-content').innerHTML = content;

      // Remove old dynamic styles
      document.querySelectorAll('.dynamic-style').forEach(el => el.remove());

      // Add new inline <style>
      doc.querySelectorAll('style').forEach(style => {
        const newStyle = document.createElement('style');
        newStyle.className = 'dynamic-style';
        newStyle.textContent = style.textContent;
        document.head.appendChild(newStyle);
      });

      // Add any external CSS
      doc.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = link.href;
        newLink.className = 'dynamic-style';
        document.head.appendChild(newLink);
      });

      // Handle inline and external scripts
      doc.querySelectorAll('script').forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
        newScript.remove();
      });

      // Convention-based initialization
      const initFunctionName = `initSection${name}`;
      if (typeof window[initFunctionName] === 'function') {
        window[initFunctionName]();
      }
    })
    .catch(error => {
      document.getElementById('main-content').innerHTML =
        `<p style="color: red;">Failed to load section: ${error}</p>`;
    });
}

function initSection10() {
  const deletionRequests = [
  {
    fullName: "John Doe",
    requestDate: "2025-09-10",
    warrantyAmount: 1500,
    serviceAmount: 500,
    firstName: "John",
    lastName: "Doe",
    mobileNo: "123-456-7890",
    nicNo: "123456789V",
    email: "john.doe@example.com",
  },
  {
    fullName: "Jane Smith",
    requestDate: "2025-09-05",
    warrantyAmount: 2000,
    serviceAmount: 750,
    firstName: "Jane",
    lastName: "Smith",
    mobileNo: "111-222-3333",
    nicNo: "987654321V",
    email: "jane.smith@example.com",
  },
  {
    fullName: "Peter Jones",
    requestDate: "2025-09-14",
    warrantyAmount: 500,
    serviceAmount: 250,
    firstName: "Peter",
    lastName: "Jones",
    mobileNo: "555-666-7777",
    nicNo: "456789123V",
    email: "peter.jones@example.com",
  },
  {
    fullName: "Mary Williams",
    requestDate: "2025-09-13",
    warrantyAmount: 1200,
    serviceAmount: 300,
    firstName: "Mary",
    lastName: "Williams",
    mobileNo: "222-333-4444",
    nicNo: "654321987V",
    email: "mary.williams@example.com",
  },
  {
    fullName: "David Brown",
    requestDate: "2025-09-08",
    warrantyAmount: 3000,
    serviceAmount: 1000,
    firstName: "David",
    lastName: "Brown",
    mobileNo: "777-888-9999",
    nicNo: "321987654V",
    email: "david.brown@example.com",
  },
];

  const tableBody = document.querySelector("#deletion-requests-table tbody");
  if (!tableBody) return;
  tableBody.innerHTML = ""; // Clear existing rows

  const today = new Date();

  deletionRequests.forEach((request) => {
    const row = document.createElement("tr");
    const requestDate = new Date(request.requestDate);
    const timeDiff = today.getTime() - requestDate.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const daysLeft = 7 - dayDiff;

    if (dayDiff >= 5) { // Highlight if 5 days or older
      row.classList.add("highlight-row");
    }

    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress-bar-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    const progress = 100;
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${daysLeft} days left`;

    if (daysLeft <= 2) {
        progressBar.style.backgroundColor = '#e74c3c'; // Red
    } else if (daysLeft <= 4) {
        progressBar.style.backgroundColor = '#f39c12'; // Yellow
    } else {
        progressBar.style.backgroundColor = '#2ecc71'; // Green
    }

    progressBarContainer.appendChild(progressBar);

    row.innerHTML = `
      <td>${request.fullName}</td>
      <td>${request.requestDate}</td>
      <td>${request.warrantyAmount}</td>
      <td>${request.serviceAmount}</td>
      <td></td>
      <td><button class="view-btn" data-email="${request.email}">View</button></td>
    `;

    row.cells[4].appendChild(progressBarContainer);
    tableBody.appendChild(row);
  });

  // Add event listeners for the view buttons
  document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const userEmail = e.target.dataset.email;
      const userData = deletionRequests.find(user => user.email === userEmail);
      populateAndShowPopup(userData);
    });
  });
}

// Function to populate and show the user details popup
function populateAndShowPopup(userData) {
  document.getElementById("popup-warranty-amount").textContent = userData.warrantyAmount;
  document.getElementById("popup-service-amount").textContent = userData.serviceAmount;
  document.getElementById("popup-first-name").textContent = userData.firstName;
  document.getElementById("popup-last-name").textContent = userData.lastName;
  document.getElementById("popup-mobile-no").textContent = userData.mobileNo;
  document.getElementById("popup-nic-no").textContent = userData.nicNo;
  document.getElementById("popup-email").textContent = userData.email;

  const popup = document.getElementById("user-details-popup");
  popup.style.display = "flex";

  // Close button
  popup.querySelector(".close-btn").onclick = () => {
    popup.style.display = "none";
  };

  // Cancel button
  popup.querySelector(".cancel-btn").onclick = () => {
    popup.style.display = "none";
  };
    
    // Delete button
    popup.querySelector('.delete-btn').onclick = () => {
        alert(`User data for ${userData.fullName} will be deleted.`);
        popup.style.display = "none";
    }
}

function initSection2() {
  const modal = document.getElementById('warrantyModal');
  const modalContent = document.getElementById('modalContent');
  const closeBtn = document.getElementById('closeWarrantyModal');

  const warrantyData = {
    seller: `
      <h2>Warranty Details</h2>
      <p><strong>Serial Number:</strong> SN-S001</p>
      <p><strong>Consumer ID:</strong> C-1001</p>
      <p><strong>Consumer Name:</strong> User A</p>
      <p><strong>Issued By (Merchant ID):</strong> MERCH-005</p>
      <p><strong>Issue Date:</strong> 2025-01-10</p>
      <p><strong>Warranty Duration:</strong> 1 Year</p>
      <p><strong>Status:</strong> Active</p>
      <p><strong>Product Name:</strong> Mixer Pro</p>
      <p><strong>Category:</strong> Kitchen</p>
      <p><strong>Warranty Document:</strong> <a href="#">View PDF</a></p>
    `,
    distributor: `
      <h2>Warranty Details</h2>
      <p><strong>Serial Number:</strong> SN-D001</p>
      <p><strong>Consumer ID:</strong> C-1002</p>
      <p><strong>Consumer Name:</strong> User B</p>
      <p><strong>Issued By (Distributor ID):</strong> DIST-002</p>
      <p><strong>Issue Date:</strong> 2025-02-14</p>
      <p><strong>Warranty Duration:</strong> 6 Months</p>
      <p><strong>Status:</strong> Voided</p>
      <p><strong>Product Name:</strong> Power Fan</p>
      <p><strong>Category:</strong> Electronics</p>
      <p><strong>Warranty Document:</strong> <a href="#">View PDF</a></p>
    `,
    mixed: `
      <h2>Warranty Details</h2>
      <p><strong>Original Serial Number:</strong> SN-MD001</p>
      <p><strong>New Serial Number (after claim):</strong> SN-MD001-NEW</p>
      <p><strong>Consumer ID:</strong> C-1003</p>
      <p><strong>Consumer Name:</strong> User C</p>
      <p><strong>Issued By (Merchant ID):</strong> MERCH-009</p>
      <p><strong>Distributor ID:</strong> DIST-011</p>
      <p><strong>Issue Date:</strong> 2025-03-05</p>
      <p><strong>Warranty Duration:</strong> 2 Years</p>
      <p><strong>Status:</strong> Claimed (Serial Changed)</p>
      <p><strong>Product Name:</strong> Smart Heater</p>
      <p><strong>Category:</strong> Home Appliances</p>
      <p><strong>Warranty Document:</strong> <a href="#">View PDF</a></p>
      <p><em>⚠️ Serial number was changed after claim.</em></p>
    `
  };

  window.showWarrantyDetails = function(type) {
    modalContent.innerHTML = warrantyData[type];
    modal.style.display = 'block';
  }

  window.filterWarranties = function(status) {
    document.querySelectorAll('#warranty-table-body tr').forEach(row => {
      row.style.display = (status === 'All' || row.dataset.status === status) ? '' : 'none';
    });
  }

  if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = 'none';
  }
}


