import { settingsHeight, settingsPadding, settingsWidth } from '../const';
import { TPadding } from '../types';
import NormalizePadding from '../util/normalizePadding';
import { TUiBaseOptions, UiBase } from './base';
import Home from './home/home';
import { uiLocationHome } from './ui.const';

export type TUi = {
  /** canvas width */
  width: number;
  /** canvas height */
  height: number;
  /** canvas padding */
  padding: TPadding;
  parent: HTMLElement;
  location: string;
  locations: UiBase[];
};

export type TUiOptions = Partial<TUi> | Ui;

export default class Ui implements TUi {
  width: number;
  height: number;
  padding: TPadding;
  parent: HTMLElement;
  location: string;
  locations: UiBase[];

  constructor(options?: TUiOptions) {
    this.padding = options?.padding ?? settingsPadding;
    const padding = NormalizePadding(this.padding);
    this.width = options?.width ?? settingsWidth;
    this.height = options?.height ?? settingsHeight;
    this.parent = options?.parent ?? document.getElementsByTagName('body')[0];
    this.location = options?.location ?? uiLocationHome;
    const settings: TUiBaseOptions = {
      parent: this.parent,
      width: this.width,
      height: this.height,
      padding: this.padding,
      navigate: location => this.show(location),
    };
    this.locations = [new Home(settings)];
    this.show(this.location);
  }

  show(location: string): void {
    const view = this.locations.find(l => l.name === location);
    console.log(location);
    if (view) {
      view.show();
    }
  }
}
