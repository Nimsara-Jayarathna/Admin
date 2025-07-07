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
    })
    .catch(error => {
      document.getElementById('main-content').innerHTML =
        `<p style="color: red;">Failed to load section: ${error}</p>`;
    });
}
