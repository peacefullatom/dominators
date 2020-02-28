import './game.css';

import Galaxy from './galaxy/galaxy';
import Ui from './ui/ui';

export type TGame = {
  parent?: HTMLElement;
  galaxy?: Galaxy;
};

export type TGameOptions = Partial<TGame> | Game;

export default class Game implements TGame {
  parent: HTMLElement;
  ui: Ui;
  galaxy?: Galaxy;

  constructor(options?: TGameOptions) {
    this.parent = options?.parent ?? document.getElementsByTagName('body')[0];
    this.ui = new Ui({ parent: this.parent });
    this.galaxy = options?.galaxy;
  }

  /** show home screen */
  home(): void {}

  /** start new game */
  new(): void {}

  /** save game */
  save(): void {}

  /** load game */
  load(): void {}

  /** pause game */
  pause(): void {}

  /** resume game */
  resume(): void {}
}
