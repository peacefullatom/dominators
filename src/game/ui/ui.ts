import { settingsHeight, settingsPadding, settingsWidth } from '../../const';
import { TPadding } from '../../types';
import Game from '../game';
import Home from './home/home';
import SelectSpecies from './selectSpecies/select.species';
import { TUiBaseOptions, UiBase } from './ui.base';
import { uiLocationHome, uiLocationSelectSpecies } from './ui.const';

/** user interface description */
export type TUi = {
  /** current location */
  location: string;
};

/** user interface options */
export type TUiOptions = (Partial<TUi> | Ui) & {
  /** game controller */
  game: Game;
  /** parent container */
  parent: HTMLElement;
  /** canvas width */
  width?: number;
  /** canvas height */
  height?: number;
  /** canvas padding */
  padding?: TPadding;
};

/** user interface data */
export default class Ui implements TUi {
  location: string;
  /** locations list */
  locations: UiBase[];
  /** options cache */
  options: TUiOptions;
  /** active view */
  view?: UiBase;

  constructor(options: TUiOptions) {
    this.location = options?.location ?? uiLocationHome;
    this.options = options;
    this.locations = [];
    this.show(this.location);
  }

  createLocation(location: string): UiBase | undefined {
    const settings: TUiBaseOptions = {
      game: this.options.game,
      parent: this.options.parent,
      width: this.options?.width ?? settingsWidth,
      height: this.options?.height ?? settingsHeight,
      padding: this.options?.padding ?? settingsPadding,
      navigate: location => this.show(location),
    };
    let view: UiBase | undefined;
    let type: typeof UiBase | undefined;
    if (location === uiLocationHome) {
      type = Home;
    }
    if (location === uiLocationSelectSpecies) {
      type = SelectSpecies;
    }
    if (type) {
      view = new type(settings);
      this.locations.push(view);
      return view;
    }
    return view;
  }

  show(location: string): void {
    let view = this.locations.find(l => l.name === location);
    console.log(location);

    if (!view) {
      view = this.createLocation(location);
    }

    if (view) {
      if (this.view) {
        this.view.hide();
      }
      view.show();
      this.view = view;
    } else {
      console.warn(`location '${location}' not found`);
    }
  }
}
