import './game.css';

import Galaxy from './galaxy/galaxy';
import { gameStatePause, gameStatePlay } from './game.const';
import Ui from './ui/ui';
import { uiLocationHome, uiLocationLoad, uiLocationSave, uiLocationSelectSpecies } from './ui/ui.const';

/** game description */
export type TGame = {};

/** game options */
export type TGameOptions = (Partial<TGame> | Game) & {
  /** parent container */
  parent: HTMLElement;
};

/** game data */
export default class Game implements TGame {
  ui: Ui;
  state: number;
  galaxy?: Galaxy;

  constructor(options: TGameOptions) {
    this.ui = new Ui({ parent: options.parent, game: this });
    this.state = gameStatePause;
  }

  /** show home screen */
  home(): void {
    this.ui.show(uiLocationHome);
  }

  /** start new game */
  new(): void {
    this.ui.show(uiLocationSelectSpecies);
  }

  /** save game */
  save(): void {
    this.ui.show(uiLocationSave);
  }

  /** load game */
  load(): void {
    this.ui.show(uiLocationLoad);
  }

  /** pause game */
  pause(): void {
    this.state = gameStatePause;
  }

  /** resume game */
  resume(): void {
    this.state = gameStatePlay;
  }
}
