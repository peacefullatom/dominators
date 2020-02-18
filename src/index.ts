import Galaxy from './galaxy/galaxy';

const start = new Date().getTime();
(document as any).g = new Galaxy();
console.log(`generation time: ${new Date().getTime() - start}`);

const app = document.getElementById('app');
if (app) {
  app.innerHTML = 'q';
  app.innerHTML += `<pre>${JSON.stringify((document as any).g, null, 2)}</pre>`;
}
