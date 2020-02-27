import Galaxy from './galaxy/galaxy';
import {
  galaxyDensities,
  galaxyDensityDense,
  galaxyDensityMedium,
  galaxyDensitySparse,
  galaxyDensityVeryDense,
  galaxyDensityVerySparse,
} from './galaxy/galaxy.const';

const densityLabel = (d: number): string => {
  if (d === galaxyDensityVeryDense) {
    return 'very dense';
  }
  if (d === galaxyDensityDense) {
    return 'dense';
  }
  if (d === galaxyDensityMedium) {
    return 'medium';
  }
  if (d === galaxyDensitySparse) {
    return 'sparse';
  }
  if (d === galaxyDensityVerySparse) {
    return 'very sparse';
  }
  return '';
};

const app = document.getElementById('app');
if (app) {
  const start = new Date().getTime();
  const galaxy = new Galaxy({ parent: app });
  (document as any).g = galaxy;
  console.log(`generation time: ${new Date().getTime() - start}`);

  galaxy.show();

  const generate = document.createElement('button');
  generate.addEventListener('click', () => {
    const systems = galaxy.generateSystems();
    galaxy.canvas.showSystems(systems);
    galaxy.canvas.showWormholes(systems);
  });
  generate.innerText = 'Generate';
  app.appendChild(generate);

  const density = document.createElement('select');
  galaxyDensities.forEach(d => {
    const option = document.createElement('option');
    option.value = d.toString();
    option.selected = galaxy.density === d;
    option.text = densityLabel(d);
    density.appendChild(option);
  });
  density.addEventListener('change', v => {
    const value = (v?.target as HTMLSelectElement)?.value;
    galaxy.setDensity(parseInt(value));
  });
  app.appendChild(density);
}
