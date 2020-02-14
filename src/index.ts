import Galaxy from './galaxy/galaxy';
import { TGalaxy } from './galaxy/galaxy.types';

const start = new Date();
new Promise<TGalaxy>(resolve => {
  const galaxy = Galaxy();
  resolve(galaxy);
}).then(galaxy => {
  const end = new Date();
  const planets = galaxy.planetarySystems
    .map(s => s.planets.length)
    .reduce((total, num) => total + num);
  const portals = galaxy.planetarySystems
    .map(s => s.portals.length)
    .reduce((total, num) => total + num);

  const app = document.getElementById('app');

  if (app) {
    app.innerHTML = `Galaxy v 1.0.0<br>`;
    app.innerHTML += `Generation time: ${end.getTime() -
      start.getTime()}ms<br>`;
    app.innerHTML += `Planetary systems: ${galaxy.planetarySystems.length}<br>`;
    app.innerHTML += `Planets: ${planets}<br>`;
    app.innerHTML += `Portals: ${portals}<br>`;
  }
});
