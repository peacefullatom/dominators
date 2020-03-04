import { settingsHeight, settingsPadding, settingsWidth } from '../../const';
import { TPadding } from '../../types';
import Canvas, { TCanvasContext } from '../../util/canvas';
import ID from '../../util/id';
import N2Px from '../../util/n2px';
import NormalizePadding from '../../util/normalizePadding';
import System, { TSystem } from './system/system';

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
  /** controls layer */
  controls: HTMLDivElement;
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
    this.controls = document.createElement('div');
    this.controls.style.position = 'relative';
    this.background = this.createCanvas('background');
    this.wormholes = this.createCanvas('wormholes');
    this.systems = this.createCanvas('systems');
    this.popups = this.createCanvas('popups');
    this.layers = [this.background, this.wormholes, this.systems, this.popups];
    this.layers.forEach(c => this.container.appendChild(c));
    this.container.appendChild(this.controls);
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
      this.controls.style.width = N2Px(width);
      this.controls.style.height = N2Px(height);
      this.controls.style.left = N2Px(padding.left);
      this.controls.style.top = N2Px(padding.top);
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
  showWormholes(systems: System[]): void {
    const ctx = this.ctx(this.wormholes);
    const finished: string[] = [];
    this.resetCanvas(this.wormholes);
    systems.forEach(s => {
      const player = s.species.some(p => p.species.player);
      if (finished.indexOf(s.id) === -1 && s.populated && player) {
        finished.push(s.id);
        s.wormholes.forEach(w => {
          const d = systems.find(s => s.id === w);
          if (d) {
            const color = d.populated || s.populated ? 'darkblue' : 'cadetblue';
            Canvas.line(ctx, {
              start: s.coordinates,
              end: d.coordinates,
              strokeStyle: color,
            });
          }
        });
      }
    });
  }

  /** draw single system */
  showSystem(
    system: TSystem,
    interactive?: boolean,
    ctx?: TCanvasContext
  ): void {
    // MAGIC NUMBERS
    const size = 7;
    const player = system.species.some(s => s.species.player);
    ctx = ctx || this.ctx(this.systems);
    if (!system.populated || (system.populated && !player)) {
      if (ctx) {
        const { x, y } = system.coordinates;
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x - size, y);
        ctx.lineTo(x, y - size);
        ctx.fillStyle = 'gray';
        ctx.fill();
      }
    } else {
      Canvas.circle(ctx, {
        point: system.coordinates,
        radius: size,
        fillStyle: 'limegreen',
      });
    }

    if (interactive === true) {
      // MAGIC NUMBERS
      const multiplier = 4;
      const control = document.createElement('div');
      control.style.position = 'absolute';
      control.style.width = N2Px(size * multiplier);
      control.style.height = N2Px(size * multiplier);
      control.style.left = N2Px(system.coordinates.x);
      control.style.top = N2Px(system.coordinates.y);
      control.style.cursor = system.populated && player ? 'pointer' : '';
      control.style.transform = 'translateX(-50%) translateY(-50%)';
      control.title = system.id;
      control.addEventListener('mouseenter', () =>
        this.highlightSystem(system)
      );
      control.addEventListener('mouseleave', () =>
        this.resetCanvas(this.popups)
      );
      this.controls.appendChild(control);
    }
  }

  highlightSystem(system: TSystem): void {
    if (system.populated && system.species.some(s => s.observable)) {
      this.highlightPopulatedSystem(system);
    } else {
      this.highlightUnpopulatedSystem(system);
    }
  }

  highlightPopulatedSystem(system: TSystem): void {
    const c = this.ctx(this.popups);
    if (c) {
      c.strokeStyle = 'red';
      c.lineWidth = 2;
      c.beginPath();
      c.arc(system.coordinates.x, system.coordinates.y, 8, 0, 2 * Math.PI);
      c.stroke();
    }
  }

  highlightUnpopulatedSystem(system: TSystem): void {
    const c = this.ctx(this.popups);
    const size = 8;
    if (c) {
      const { x, y } = system.coordinates;
      c.strokeStyle = 'red';
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(x, y - size);
      c.lineTo(x + size, y);
      c.lineTo(x, y + size);
      c.lineTo(x - size, y);
      c.lineTo(x, y - size);
      c.stroke();
    }
  }

  /** redraw systems */
  showSystems(
    systems: TSystem[],
    interactive?: boolean,
    ctx?: TCanvasContext
  ): void {
    ctx = ctx || this.ctx(this.systems);
    this.resetCanvas(this.systems);
    this.controls.innerHTML = '';
    systems.forEach(s => this.showSystem(s, interactive, ctx));
  }

  /** redraws layers */
  show(systems: System[], layer: TGalaxyLayers, interactive?: boolean): void {
    if (this.parent) {
      if (layer.systems) {
        this.showSystems(systems, interactive);
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
