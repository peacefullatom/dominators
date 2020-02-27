import Canvas, { TCanvasContext } from '../util/canvas';
import ID from '../util/id';
import Galaxy from './galaxy';
import System from './system/system';

/** vertical and horizontal */
export type TPaddingVH = [number, number];
/** top, horizontal, and bottom */
export type TPaddingTHB = [number, number, number];
/** top, right, bottom, and left */
export type TPaddingTRBL = [number, number, number, number];
/** padding is mirroring CSS rule */
export type TPadding = number | TPaddingVH | TPaddingTHB | TPaddingTRBL;
/** normalized padding */
export type TPaddingNormal = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

/** galaxy canvas description */
export type TGalaxyCanvas = {
  /** canvas id */
  id: string;
  /** canvas parent */
  parent: HTMLElement;
  /** canvas width */
  width: number;
  /** canvas height */
  height: number;
  /** canvas padding */
  padding: TPadding;
};

/** galaxy canvas options */
export type TGalaxyCanvasOptions = Partial<TGalaxyCanvas> | GalaxyCanvas;

/** galaxy canvas data */
export default class GalaxyCanvas implements TGalaxyCanvas {
  id: string;
  parent: HTMLElement;
  width: number;
  height: number;
  padding: TPadding;
  /** container */
  container: HTMLDivElement;
  /** background layer */
  background: HTMLCanvasElement;
  /** wormholes layer */
  wormholes: HTMLCanvasElement;
  /** systems layer */
  systems: HTMLCanvasElement;
  /** popups layer */
  popups: HTMLCanvasElement;

  constructor(options?: TGalaxyCanvasOptions) {
    this.id = options?.id ?? ID();
    this.parent = options?.parent ?? document.getElementsByTagName('body')[0];
    this.padding = options?.padding ?? 16;
    const padding = this.normalizedPadding(this.padding);
    this.width = (options?.width ?? 640) - padding.left - padding.right;
    this.height = (options?.height ?? 480) - padding.top - padding.bottom;
    this.container = document.createElement('div');
    this.background = this.createCanvas();
    this.wormholes = this.createCanvas();
    this.systems = this.createCanvas();
    this.popups = this.createCanvas();
    this.setup();
  }

  setup(): void {
    if (this.parent) {
      const padding = this.normalizedPadding(this.padding);
      this.container.style.width = `${this.width +
        padding.left +
        padding.right}px`;
      this.container.style.height = `${this.height +
        padding.top +
        padding.bottom}px`;
      this.container.style.position = 'relative';
      this.container.style.outline = `1px solid red`;
      this.container.appendChild(this.background);
      this.container.appendChild(this.wormholes);
      this.container.appendChild(this.systems);
      this.container.appendChild(this.popups);
      this.parent.appendChild(this.container);
    }
  }

  ctx(layer: HTMLCanvasElement): TCanvasContext {
    return layer.getContext('2d', {
      alpha: true,
      desynchronized: true,
    });
  }

  resetCanvas(layer: HTMLCanvasElement): void {
    const ctx = this.ctx(layer);
    if (ctx) {
      ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  createCanvas(): HTMLCanvasElement {
    const padding = this.normalizedPadding(this.padding);
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.paddingTop = `${padding.top}px`;
    canvas.style.paddingRight = `${padding.right}px`;
    canvas.style.paddingBottom = `${padding.bottom}px`;
    canvas.style.paddingLeft = `${padding.left}px`;
    canvas.style.position = 'absolute';
    return canvas;
  }

  normalizedPadding(padding: TPadding): TPaddingNormal {
    if (padding instanceof Array) {
      if (padding.length === 4) {
        const [top, right, bottom, left] = padding;
        return { top, right, bottom, left };
      } else if (padding.length === 3) {
        const [top, horizontal, bottom] = padding;
        return { top, right: horizontal, bottom, left: horizontal };
      } else {
        const [vertical, horizontal] = padding;
        return {
          top: vertical,
          right: horizontal,
          bottom: vertical,
          left: horizontal,
        };
      }
    } else {
      return { top: padding, right: padding, bottom: padding, left: padding };
    }
  }

  showSystem(system: System, i?: number): void {
    const ctx = this.ctx(this.systems);
    Canvas.circle(ctx, {
      point: system.coordinates,
      radius: 5,
      fillStyle: 'black',
    });
    // Canvas.text(ctx, {
    //   data: typeof i === 'number' ? i.toString() : 'NaN',
    //   point: system.coordinates,
    // });
  }

  showSystems(systems: System[]): void {
    this.resetCanvas(this.systems);
    systems.forEach((system, i) => this.showSystem(system, i));
  }

  showWormholes(systems: System[]): void {
    const ctx = this.ctx(this.wormholes);
    const finished: string[] = [];
    this.resetCanvas(this.wormholes);
    systems.forEach(s => {
      if (finished.indexOf(s.id) === -1) {
        finished.push(s.id);
        s.wormholes.forEach(w => {
          if (w) {
            Canvas.line(ctx, {
              start: s.coordinates,
              end: w.coordinates,
              strokeStyle: 'black',
            });
          }
        });
      }
    });
  }

  show(galaxy: Galaxy): void {
    this.showSystems(galaxy.systems);
    this.showWormholes(galaxy.systems);
  }

  hide(): void {}
}
