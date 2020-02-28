import { TPoint } from '../../types';
import GalaxyCanvas from '../galaxy/galaxy.canvas';

// source is here
// https://bl.ocks.org/Azgaar/4904e89c12c7347a9e1639edb7655e10
const poissonDiscSampler = (
  canvas: GalaxyCanvas,
  radius: number,
  candidates: number
): (() => TPoint | undefined) => {
  const radius2 = radius ** 2;
  const R = 3 * radius2;
  const cellSize = radius * Math.SQRT1_2;
  const padding = canvas.normalizedPadding(canvas.padding);
  const width = canvas.width - padding.left - padding.right;
  const height = canvas.height - padding.top - padding.bottom;
  const gridWidth = Math.ceil(width / cellSize);
  const gridHeight = Math.ceil(height / cellSize);
  const grid: TPoint[] = new Array(gridWidth * gridHeight);
  const queue: TPoint[] = [];
  let queueSize = 0;
  let sampleSize = 0;

  const sample = (x: number, y: number): TPoint => {
    const p: TPoint = { x, y };
    queue.push(p);
    grid[gridWidth * ((y / cellSize) | 0) + ((x / cellSize) | 0)] = p;
    ++sampleSize;
    ++queueSize;
    return p;
  };

  const far = (x: number, y: number): boolean => {
    let i = (x / cellSize) | 0;
    let j = (y / cellSize) | 0;
    const i0 = Math.max(i - 2, 0);
    const j0 = Math.max(j - 2, 0);
    const i1 = Math.min(i + 3, gridWidth);
    const j1 = Math.min(j + 3, gridHeight);

    for (j = j0; j < j1; ++j) {
      const o = j * gridWidth;
      for (i = i0; i < i1; ++i) {
        const s = grid[o + i];
        if (s) {
          const dx = (s.x - x) ** 2;
          const dy = (s.y - y) ** 2;
          if (dx + dy < radius2) {
            return false;
          }
        }
      }
    }

    return true;
  };

  return () => {
    if (!sampleSize) {
      return sample(Math.random() * width, Math.random() * height);
    }

    while (queueSize) {
      const i = (Math.random() * queueSize) | 0;
      const p = queue[i];
      for (let j = 0; j < candidates; ++j) {
        const a = 2 * Math.PI * Math.random();
        const r = Math.sqrt(Math.random() * R + radius2);
        const x = p.x + r * Math.cos(a);
        const y = p.y + r * Math.sin(a);
        if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) {
          return sample(x, y);
        }
      }
      queue[i] = queue[--queueSize];
      queue.length = queueSize;
    }
  };
};

const CreateDistributedPoints = (
  canvas: GalaxyCanvas,
  radius: number
): TPoint[] => {
  const sampler = poissonDiscSampler(canvas, radius, 20);
  const sites: TPoint[] = [];
  let sample: TPoint | undefined;

  while ((sample = sampler())) {
    sites.push(sample);
  }

  return sites;
};

export default CreateDistributedPoints;
