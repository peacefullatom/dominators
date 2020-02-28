import './home.css';

import * as config from '../../../../package.json';
import N2Px from '../../../util/n2px';
import { TUiBase, TUiBaseOptions, UiBase } from '../ui.base';
import { uiLocationHome, uiLocationSelectSpecies } from '../ui.const';

export type THome = {} & TUiBase;

export type THomeOptions = (Partial<THome> | Home) & TUiBaseOptions;

export default class Home extends UiBase implements THome {
  background: HTMLCanvasElement;

  constructor(options: THomeOptions) {
    super(options);

    this.name = uiLocationHome;
    this.background = this.createLayer();
    this.container.appendChild(this.background);

    this.generateBackground(this.background);
    this.generateLogo();
    this.generateMenu();
    this.generateVersion();
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
