import { settingsHeight, settingsPadding, settingsWidth } from '../../const';
import { TPadding } from '../../types';
import Canvas, { TCanvasContext } from '../util/canvas';
import ID from '../util/id';
import NormalizePadding from '../util/normalizePadding';
import Galaxy from './galaxy';
import System from './system/system';

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
    this.padding = options?.padding ?? settingsPadding;
    const padding = NormalizePadding(this.padding);
    this.width =
      (options?.width ?? settingsWidth) - padding.left - padding.right;
    this.height =
      (options?.height ?? settingsHeight) - padding.top - padding.bottom;
    this.container = document.createElement('div');
    this.background = this.createCanvas();
    this.wormholes = this.createCanvas();
    this.systems = this.createCanvas();
    this.popups = this.createCanvas();
    this.setup();
  }

  setup(): void {
    if (this.parent) {
      const padding = NormalizePadding(this.padding);
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
    const padding = NormalizePadding(this.padding);
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
