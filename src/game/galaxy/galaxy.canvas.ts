import { settingsHeight, settingsPadding, settingsWidth } from '../../const';
import { TPadding, TPoint } from '../../types';
import Canvas, { TCanvasContext } from '../../util/canvas';
import ID from '../../util/id';
import N2Px from '../../util/n2px';
import NormalizePadding from '../../util/normalizePadding';
import { TSystem } from './system/system';

/** defines which layers to be shown */
export type TGalaxyLayers = {
  /** background layer */
  background?: boolean;
  /** wormholes layer */
  wormholes?: boolean;
  /** systems layer */
  systems?: boolean;
  /** popups layer */
  popups?: boolean;
};

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
  /** collection of layers */
  layers: HTMLCanvasElement[] = [];

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
    this.container.id = 'galaxy_canvas';
    this.background = this.createCanvas('background');
    this.wormholes = this.createCanvas('wormholes');
    this.systems = this.createCanvas('systems');
    this.popups = this.createCanvas('popups');
    this.layers = [this.background, this.wormholes, this.systems, this.popups];
    this.layers.forEach(c => this.container.appendChild(c));
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
      this.layers.forEach(c => {
        c.width = width;
        c.height = height;
      });
    }
  }

  ctx(layer: HTMLCanvasElement): TCanvasContext {
    return layer.getContext('2d', {
      alpha: true,
      desynchronized: true,
    });
  }

  /** reset all layers */
  reset(): void {
    this.layers.forEach(l => this.resetCanvas(l));
  }

  /** clear canvas */
  resetCanvas(layer: HTMLCanvasElement): void {
    const ctx = this.ctx(layer);
    if (ctx) {
      ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  /** create canvas */
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

  /** redraw wormholes layer */
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

  /** draw single system */
  showSystem(point: TPoint, ctx?: TCanvasContext): void {
    ctx = ctx || this.ctx(this.systems);
    Canvas.circle(ctx, {
      point,
      radius: 5,
      fillStyle: 'black',
    });
  }

  /** redraw systems */
  showSystems(points: TPoint[], ctx?: TCanvasContext): void {
    ctx = ctx || this.ctx(this.systems);
    this.resetCanvas(this.systems);
    points.forEach(p => this.showSystem(p, ctx));
  }

  /** redraws layers */
  show(systems: TSystem[], layer: TGalaxyLayers): void {
    if (this.parent) {
      if (layer.systems) {
        this.showSystems(systems.map(s => s.coordinates));
      }
      if (layer.wormholes) {
        this.showWormholes(systems);
      }
      this.parent.appendChild(this.container);
    }
  }

  /** hide galaxy */
  hide(): void {
    if (this.parent) {
      this.parent.removeChild(this.container);
    }
  }
}
