import { poissonDiscSamplerWidth } from '../../util/poisson';

export const galaxyCanvasCoordinate = (
  coordinate: number,
  size: number
): number => (coordinate * size) / poissonDiscSamplerWidth;

export const galaxyCanvasClear = (canvas: HTMLCanvasElement): void => {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};
