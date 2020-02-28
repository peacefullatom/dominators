import './ui.base.css';

import { settingsHeight, settingsPadding, settingsWidth } from '../../const';
import { TPadding, TPaddingNormal, TPoint } from '../../types';
import Canvas, { TCanvasContext } from '../../util/canvas';
import ID from '../../util/id';
import N2Px from '../../util/n2px';
import NormalizePadding from '../../util/normalizePadding';
import RandomNumber from '../../util/randomNumber';
import Game from '../game';

/** canvas options */
export type TCanvasOptions = {
  id?: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  padding?: TPadding;
};

/** user interface base description */
export type TUiBase = {
  /** base id */
  id: string;
  /** game controller */
  game: Game;
  /** base name */
  name: string;
  /** parent container */
  parent: HTMLElement;
  /** base padding settings */
  padding: TPadding;
  /** base width */
  width: number;
  /** base height */
  height: number;
  /** navigation callback (?) */
  navigate: (location: string) => void;
};

/** user interface base options */
export type TUiBaseOptions = (Partial<TUiBase> | UiBase) & {
  /** game controller */
  game: Game;
  /** parent container */
  parent: HTMLElement;
};

/** user interface base data */
export class UiBase implements TUiBase {
  id: string;
  game: Game;
  name: string;
  parent: HTMLElement;
  padding: TPadding;
  width: number;
  height: number;
  navigate: (location: string) => void;
  /** base container */
  container: HTMLDivElement;

  constructor(options: TUiBaseOptions) {
    this.id = options?.id ?? ID();
    this.game = options.game;
    this.name = options?.name ?? `not set`;
    this.parent = options.parent;
    this.padding = options?.padding ?? settingsPadding;
    this.width = options?.width ?? settingsWidth;
    this.height = options?.height ?? settingsHeight;
    this.navigate = options?.navigate ?? (l => console.log(l));
    this.container = document.createElement('div');
    this.container.id = ID();
    this.container.className = 'container';
    this.container.style.width = N2Px(this.width);
    this.container.style.height = N2Px(this.height);
  }

  show(): void {
    this.parent.appendChild(this.container);
  }

  hide(): void {
    this.parent.removeChild(this.container);
  }

  createLayer(options?: TCanvasOptions): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    let padding: TPaddingNormal = { top: 0, right: 0, bottom: 0, left: 0 };
    if (options?.padding) {
      padding = NormalizePadding(options.padding);
    }
    const width =
      (options?.width ?? settingsWidth) - padding.left - padding.right;
    const height =
      (options?.height ?? settingsHeight) - padding.top - padding.bottom;
    canvas.id = options?.id ?? ID();
    canvas.width = width;
    canvas.height = height;
    canvas.style.position = 'absolute';
    canvas.style.top = N2Px(options?.top ?? 0);
    canvas.style.left = N2Px(options?.left ?? 0);
    canvas.style.paddingTop = N2Px(padding.top);
    canvas.style.paddingRight = N2Px(padding.right);
    canvas.style.paddingBottom = N2Px(padding.bottom);
    canvas.style.paddingLeft = N2Px(padding.left);
    return canvas;
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

  generateBackground(background: HTMLCanvasElement): void {
    const point: TPoint = { x: 0, y: 0 };
    const step = RandomNumber(20, 10);
    const dx = Math.floor(this.width / step);
    const dy = Math.floor(this.height / step);

    for (let x = 0; x < dx; x++) {
      for (let y = 0; y < dy; y++) {
        point.x = x * step;
        point.y = y * step;
        Canvas.circle(this.ctx(background), {
          fillStyle: 'black',
          radius: 0.5,
          point,
        });
      }
    }
  }
}
