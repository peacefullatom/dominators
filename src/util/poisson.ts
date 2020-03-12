import { TPoint } from '../types';

export const poissonDiscSamplerWidth = 100;

// source is here
// https://bl.ocks.org/Azgaar/4904e89c12c7347a9e1639edb7655e10
const poissonDiscSampler = (
  radius: number,
  candidates: number
): (() => TPoint | undefined) => {
  const gap = 3;
  const radius2 = radius ** 2;
  const R = 3 * radius2;
  const cellSize = radius * Math.SQRT1_2;
  const size = poissonDiscSamplerWidth - gap;
  const gridWidth = Math.ceil(size / cellSize);
  const gridHeight = Math.ceil(size / cellSize);
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

  return (): TPoint | undefined => {
    if (!sampleSize) {
      return sample(Math.random() * size, Math.random() * size);
    }

    while (queueSize) {
      const i = (Math.random() * queueSize) | 0;
      const p = queue[i];
      for (let j = 0; j < candidates; ++j) {
        const a = 2 * Math.PI * Math.random();
        const r = Math.sqrt(Math.random() * R + radius2);
        const x = p.x + r * Math.cos(a);
        const y = p.y + r * Math.sin(a);
        if (gap <= x && x < size && gap <= y && y < size && far(x, y)) {
          return sample(x, y);
        }
      }
      queue[i] = queue[--queueSize];
      queue.length = queueSize;
    }
  };
};

const CreateDistributedPoints = (radius: number): TPoint[] => {
  const sampler = poissonDiscSampler(radius, 20);
  const sites: TPoint[] = [];
  let sample: TPoint | undefined;

  while ((sample = sampler())) {
    sites.push(sample);
  }

  return sites;
};

export default CreateDistributedPoints;
