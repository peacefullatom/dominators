import { TPoint } from '../types';

export type TCanvasContext = CanvasRenderingContext2D | null;

export type TCanvasCircle = {
  fillStyle?: string;
  point?: TPoint;
  radius?: number;
};

export type TCanvasLine = {
  start?: TPoint;
  end?: TPoint;
  strokeStyle?: string;
};

export type TCanvasText = {
  data?: string;
  fillStyle?: string;
  font?: string;
  point?: TPoint;
};

const Canvas = {
  circle(ctx: TCanvasContext, circle?: TCanvasCircle): void {
    if (ctx) {
      ctx.fillStyle = circle?.fillStyle ?? 'black';
      ctx.beginPath();
      ctx.arc(
        circle?.point?.x ?? 0,
        circle?.point?.y ?? 0,
        circle?.radius ?? 10,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  },
  line(ctx: TCanvasContext, line?: TCanvasLine): void {
    if (ctx) {
      ctx.strokeStyle = line?.strokeStyle ?? `black`;
      ctx.fillStyle = line?.strokeStyle ?? 'black';
      ctx.beginPath();
      ctx.moveTo(line?.start?.x ?? 0, line?.start?.y ?? 0);
      ctx.lineTo(line?.end?.x ?? 0, line?.end?.y ?? 0);
      ctx.stroke();
    }
  },
  text(ctx: TCanvasContext, text?: TCanvasText): void {
    if (ctx) {
      ctx.fillStyle = text?.fillStyle ?? 'black';
      ctx.font = text?.font ?? '20px sans-serif';
      ctx.fillText(text?.data ?? ``, text?.point?.x ?? 0, text?.point?.y ?? 0);
    }
  },
};

export default Canvas;
