import './base.css';

import { settingsHeight, settingsPadding, settingsWidth } from '../const';
import { TPadding, TPaddingNormal } from '../types';
import { TCanvasContext } from '../util/canvas';
import ID from '../util/id';
import N2Px from '../util/n2px';
import NormalizePadding from '../util/normalizePadding';

export type TCanvasOptions = {
  id?: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  padding?: TPadding;
};

export type TUiBase = {
  id: string;
  name: string;
  parent: HTMLElement;
  padding: TPadding;
  width: number;
  height: number;
  navigate: (location: string) => void;
};

export type TUiBaseOptions = Partial<TUiBase> | UiBase;

export class UiBase implements TUiBase {
  id: string;
  name: string;
  parent: HTMLElement;
  padding: TPadding;
  width: number;
  height: number;
  navigate: (location: string) => void;
  container: HTMLDivElement;

  constructor(options?: TUiBaseOptions) {
    this.id = options?.id ?? ID();
    this.name = options?.name ?? `not set`;
    this.parent = options?.parent ?? document.getElementsByTagName('body')[0];
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
}
