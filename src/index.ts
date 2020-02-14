import Galaxy from './galaxy/galaxy';

const galaxy = Galaxy();

const app = document.getElementById('app');

if (app) {
  app.innerHTML = `Galaxy v 1.0.0<br>`;
  app.innerHTML +=
    `<pre><code>` + JSON.stringify(galaxy, null, 2) + `</code></pre>`;
}
