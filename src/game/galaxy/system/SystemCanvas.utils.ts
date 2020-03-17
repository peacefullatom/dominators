import { TSystemWormhole } from './System.types';

const systemCanvasClear = (canvas: HTMLCanvasElement): void => {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

const systemCanvasWrapper = (
  canvas: HTMLCanvasElement,
  render: (ctx: CanvasRenderingContext2D) => void
): void => {
  systemCanvasClear(canvas);
  const context = canvas.getContext('2d');
  if (context) {
    render(context);
  }
};

const galaxyCanvasCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
): void => {
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
};

export const systemCanvasWormholes = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  wormholes: TSystemWormhole[]
): void => {
  systemCanvasWrapper(canvas, ctx => {
    wormholes.map(wormhole => {
      const t = Math.tan(((wormhole.angle ?? 0) / 360) * Math.PI);
      const p = 1 + t ** 2;
      const m = 0.45;
      const rx = width * m;
      const ry = height * m;
      const px = width / 2 + (rx * (1 - t ** 2)) / p;
      const py = height / 2 + (ry * 2 * t) / p;
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.beginPath();
      galaxyCanvasCircle(ctx, px, py, 7);
      ctx.stroke();
      ctx.font = '14px Arial';
      ctx.fillStyle = 'yellow';
      ctx.fillText(wormhole.name, px, py);
    });
  });
};
