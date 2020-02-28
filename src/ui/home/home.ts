import './home.css';

import * as config from '../../../package.json';
import { TPoint } from '../../types';
import Canvas from '../../util/canvas';
import N2Px from '../../util/n2px';
import RandomNumber from '../../util/randomNumber';
import { TUiBase, TUiBaseOptions, UiBase } from '../base';
import { uiLocationHome, uiLocationSelectSpecies } from '../ui.const';

export type THome = {} & TUiBase;

export type THomeOptions = (Partial<THome> | Home) & TUiBaseOptions;

export default class Home extends UiBase implements THome {
  background: HTMLCanvasElement;

  constructor(options?: THomeOptions) {
    super(options);
    this.name = uiLocationHome;
    this.background = this.createLayer();
    this.container.appendChild(this.background);

    this.generateBackground();
    this.generateLogo();
    this.generateMenu();
    this.generateVersion();
  }

  generateBackground(): void {
    const point: TPoint = { x: 0, y: 0 };
    const step = 10;
    const hue = RandomNumber(360);
    const dx = Math.floor(this.width / step);
    const dy = Math.floor(this.height / step);

    for (let x = 0; x < dx; x++) {
      for (let y = 0; y < dy; y++) {
        point.x = x * step;
        point.y = y * step;
        Canvas.circle(this.ctx(this.background), {
          fillStyle: `hsla(${hue},100%,50%,1)`,
          radius: 0.5,
          point,
        });
      }
    }
  }

  generateLogo(): void {
    const logo = document.createElement('div');
    logo.innerText = 'Galaxy';
    logo.style.height = N2Px(this.height / 10);
    logo.style.width = N2Px(this.width);
    logo.className = 'logo';
    this.container.appendChild(logo);
  }

  createMenuItem(): HTMLDivElement {
    const item = document.createElement('div');
    item.innerText = 'New game';
    item.style.height = N2Px(this.height / 10);
    item.className = 'item';
    item.addEventListener('click', () =>
      this.navigate(uiLocationSelectSpecies)
    );
    return item;
  }

  generateMenu(): void {
    const menu = document.createElement('div');
    menu.style.width = N2Px(this.width);
    menu.style.height = N2Px(this.height - this.height / 5);
    menu.appendChild(this.createMenuItem());
    menu.className = 'menu';
    this.container.appendChild(menu);
  }

  generateVersion(): void {
    const version = document.createElement('div');
    version.innerText = config.version;
    version.style.width = N2Px(this.width);
    version.style.height = N2Px(this.height / 10);
    version.className = 'version';
    this.container.appendChild(version);
  }
}
