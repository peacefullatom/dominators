import { settingsHeight, settingsPadding, settingsWidth } from '../../const';
import { TPadding } from '../../types';
import Game from '../game';
import { TUiBaseOptions, UiBase } from './base';
import Home from './home/home';
import SelectSpecies from './selectSpecies/select.species';
import { uiLocationHome } from './ui.const';

/** user interface description */
export type TUi = {
  /** game controller */
  game: Game;
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
  game: Game;
  location: string;
  /** locations list */
  locations: UiBase[];
  /** active view */
  view?: UiBase;

  constructor(options: TUiOptions) {
    this.game = options.game;
    this.location = options?.location ?? uiLocationHome;
    const settings: TUiBaseOptions = {
      parent: options.parent,
      width: options?.width ?? settingsWidth,
      height: options?.height ?? settingsHeight,
      padding: options?.padding ?? settingsPadding,
      navigate: location => this.show(location),
    };
    this.locations = [new Home(settings), new SelectSpecies(settings)];
    this.show(this.location);
  }

  show(location: string): void {
    const view = this.locations.find(l => l.name === location);
    console.log(location);
    if (view) {
      if (this.view) {
        this.view.hide();
      }
      view.show();
      this.view = view;
    }
  }
}
