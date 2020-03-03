import { settingsHeight, settingsPadding, settingsWidth } from '../../const';
import { TPadding, TPoint } from '../../types';
import Canvas, { TCanvasContext } from '../../util/canvas';
import ID from '../../util/id';
import N2Px from '../../util/n2px';
import NormalizePadding from '../../util/normalizePadding';
import { TSystem } from './system/system';

/** galaxy canvas description */
export type TGalaxyCanvas = {
  /** canvas id */
  id: string;
  /** canvas parent */
  parent?: HTMLElement;
  /** canvas width */
  width: number;
  /** canvas height */
  height: number;
  /** canvas padding */
  padding?: TPadding;
};

/** galaxy canvas options */
export type TGalaxyCanvasOptions = Partial<TGalaxyCanvas> | TGalaxyCanvas;

/** galaxy canvas data */
export default class GalaxyCanvas implements TGalaxyCanvas {
  id: string;
  parent?: HTMLElement;
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
    this.parent = options?.parent;
    this.padding = options?.padding ?? settingsPadding;
    const padding = NormalizePadding(this.padding);
    this.width =
      (options?.width ?? settingsWidth) - padding.left - padding.right;
    this.height =
      (options?.height ?? settingsHeight) - padding.top - padding.bottom;
    this.container = document.createElement('div');
    this.background = this.createCanvas('background');
    this.wormholes = this.createCanvas('wormholes');
    this.systems = this.createCanvas('systems');
    this.popups = this.createCanvas('popups');
    [this.background, this.wormholes, this.systems, this.popups].forEach(c =>
      this.container.appendChild(c)
    );
  }

  setup(parent: HTMLElement): void {
    if (parent) {
      this.parent = parent;
      this.width = parent.offsetWidth;
      this.height = parent.offsetHeight;
      this.container.style.width = N2Px(this.width);
      this.container.style.height = N2Px(this.height);
      const padding = NormalizePadding(this.padding);
      const width = this.width - padding.left - padding.right;
      const height = this.height - padding.top - padding.bottom;
      [this.background, this.wormholes, this.systems, this.popups].forEach(
        c => {
          c.width = width;
          c.height = height;
        }
      );
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

  createCanvas(id?: string): HTMLCanvasElement {
    const padding = NormalizePadding(this.padding);
    const canvas = document.createElement('canvas');
    canvas.id = id || ID();
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.paddingTop = `${padding.top}px`;
    canvas.style.paddingRight = `${padding.right}px`;
    canvas.style.paddingBottom = `${padding.bottom}px`;
    canvas.style.paddingLeft = `${padding.left}px`;
    canvas.style.position = 'absolute';
    return canvas;
  }

  showWormholes(systems: TSystem[]): void {
    const ctx = this.ctx(this.wormholes);
    const finished: string[] = [];
    this.resetCanvas(this.wormholes);
    systems.forEach(s => {
      if (finished.indexOf(s.id) === -1) {
        finished.push(s.id);
        s.wormholes.forEach(w => {
          const d = systems.find(s => s.id === w);
          if (d) {
            Canvas.line(ctx, {
              start: s.coordinates,
              end: d.coordinates,
              strokeStyle: 'black',
            });
          }
        });
      }
    });
  }

  showSystem(point: TPoint, ctx?: TCanvasContext): void {
    ctx = ctx || this.ctx(this.systems);
    Canvas.circle(ctx, {
      point,
      radius: 5,
      fillStyle: 'black',
    });
  }

  showSystems(points: TPoint[], ctx?: TCanvasContext): void {
    ctx = ctx || this.ctx(this.systems);
    this.resetCanvas(this.systems);
    points.forEach(p => this.showSystem(p, ctx));
  }

  show(
    systems: TSystem[],
    options: { systems?: boolean; wormholes?: boolean }
  ): void {
    if (this.parent) {
      if (options.systems) {
        this.showSystems(systems.map(s => s.coordinates));
      }
      if (options.wormholes) {
        this.showWormholes(systems);
      }
      this.parent.appendChild(this.container);
    }
  }

  hide(): void {
    if (this.parent) {
      this.parent.removeChild(this.container);
    }
  }
}
