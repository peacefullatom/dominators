import { TPoint } from '../../types';
import { poissonDiscSamplerWidth } from '../../util/poisson';
import {
  systemShapeCircle,
  systemStatusBattle,
  systemStatusHostile,
  systemStatusNeutral,
  systemStatusObservable,
  systemStatusPeaceful,
} from './system/System.const';
import { TSystem } from './system/System.types';

export const galaxyCanvasCoordinate = (
  coordinate: number,
  size: number
): number => (coordinate * size) / poissonDiscSamplerWidth;

export const galaxyCanvasCoordinates = (
  point: TPoint,
  width: number,
  height: number
): { x: number; y: number } => ({
  x: galaxyCanvasCoordinate(point.x, width),
  y: galaxyCanvasCoordinate(point.y, height),
});

export const galaxyCanvasClear = (canvas: HTMLCanvasElement): void => {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

// #9cdcfe85 unvisited system
// #9cdcfe42 observable system
// #6a9955ff peaceful system
// #569cd6ff neutral system
// #f88070ff hostile system
// #ce9178ff battle system
// #dcdcaaff backup

const systemColor = (status?: number, interactive?: boolean): string => {
  if (!interactive) {
    return '#9cdcfe85';
  }
  if (status === systemStatusObservable) {
    return '#9cdcfe42';
  }
  if (status === systemStatusPeaceful) {
    return '#6a9955ff';
  }
  if (status === systemStatusNeutral) {
    return '#569cd6ff';
  }
  if (status === systemStatusHostile) {
    return '#f88070ff';
  }
  if (status === systemStatusBattle) {
    return '#ce9178ff';
  }
  // unvisited
  return '#9cdcfe85';
};

const galaxyCanvasWrapper = (
  canvas: HTMLCanvasElement,
  render: (ctx: CanvasRenderingContext2D) => void
): void => {
  galaxyCanvasClear(canvas);
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

const galaxyCanvasDiamond = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
): void => {
  ctx.moveTo(x, y - size);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x - size, y);
  ctx.lineTo(x, y - size);
};

export const galaxyCanvasSystems = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  systems: TSystem[],
  interactive?: boolean
): void => {
  galaxyCanvasWrapper(canvas, ctx => {
    systems.forEach(system => {
      const { shape, status } = system.coordinates;
      const color = systemColor(status, interactive);
      const { x, y } = galaxyCanvasCoordinates(
        system.coordinates,
        width,
        height
      );
      ctx.fillStyle = color;
      ctx.beginPath();
      if (shape === systemShapeCircle && interactive) {
        galaxyCanvasCircle(ctx, x, y, 5);
      } else {
        galaxyCanvasDiamond(ctx, x, y, 7);
      }
      ctx.fill();
    });
  });
};

export const galaxyCanvasHighlight = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  system?: TSystem
): void => {
  galaxyCanvasWrapper(canvas, ctx => {
    if (system) {
      const { shape } = system.coordinates;
      const { x, y } = galaxyCanvasCoordinates(
        system.coordinates,
        width,
        height
      );
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (shape === systemShapeCircle) {
        galaxyCanvasCircle(ctx, x, y, 7);
      } else {
        galaxyCanvasDiamond(ctx, x, y, 9);
      }
      ctx.stroke();
    }
  });
};

export const galaxyCanvasPopup = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  system?: TSystem
): void => {
  galaxyCanvasWrapper(canvas, ctx => {
    if (system) {
      const { name } = system;
      const { x, y } = galaxyCanvasCoordinates(
        system.coordinates,
        width,
        height
      );
      ctx.font = `14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`;
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      // MAGIC NUMBERS
      const dy = y > 30 ? y - 15 : y + 25;
      ctx.fillText(name, x, dy);
    }
  });
};

export const galaxyCanvasWormholes = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  systems: TSystem[]
): void => {
  galaxyCanvasWrapper(canvas, ctx => {
    const finished: string[] = [];
    systems.forEach(system => {
      const player = system.species.some(p => p.data.player);
      if (finished.indexOf(system.id) === -1 && system.populated && player) {
        // if (finished.indexOf(system.id) === -1 && system.populated) {
        finished.push(system.id);
        system.wormholes.forEach(wormhole => {
          const destination = systems.find(s => s.id === wormhole.id);
          if (destination) {
            const color =
              destination.populated || system.populated
                ? 'cadetblue'
                : 'darkblue';
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(
              galaxyCanvasCoordinate(system.coordinates.x, width),
              galaxyCanvasCoordinate(system.coordinates.y, height)
            );
            ctx.lineTo(
              galaxyCanvasCoordinate(destination.coordinates.x, width),
              galaxyCanvasCoordinate(destination.coordinates.y, height)
            );
            ctx.stroke();
          }
        });
      }
    });
  });
};
