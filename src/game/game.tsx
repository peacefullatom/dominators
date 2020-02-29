import './game.scss';

import React, { useState } from 'react';

import UiHome from './ui/home/home';
import UiLoad from './ui/load/load';
import UiSelectSpecies from './ui/selectSpecies/select.species';
import { uiLocationHome, uiLocationLoad, uiLocationSelectSpecies } from './ui/ui.const';

type TGame = {
  view?: string;
};

const Game: React.FC<TGame> = ({ view }) => {
  const [currentView, setCurrentView] = useState(view ?? uiLocationHome);
  const home = (): void => setCurrentView(uiLocationHome);

  let content: JSX.Element;

  if (currentView === uiLocationLoad) {
    content = <UiLoad home={home}></UiLoad>;
  } else if (currentView === uiLocationSelectSpecies) {
    content = <UiSelectSpecies home={home}></UiSelectSpecies>;
  } else {
    content = (
      <UiHome
        start={(): void => setCurrentView(uiLocationSelectSpecies)}
        load={(): void => setCurrentView(uiLocationLoad)}
      ></UiHome>
    );
  }

  return <div className='game'>{content}</div>;
};

export default Game;

// import Galaxy from './galaxy/galaxy';
// import { gameStatePause, gameStatePlay } from './game.const';
// import Ui from './ui/ui';
// import { uiLocationHome, uiLocationLoad, uiLocationSave, uiLocationSelectSpecies } from './ui/ui.const';

// /** game description */
// export type TGame = {};

// /** game options */
// export type TGameOptions = (Partial<TGame> | Game) & {
//   /** parent container */
//   parent: HTMLElement;
// };

// /** game data */
// export default class Game implements TGame {
//   ui: Ui;
//   state: number;
//   galaxy: Galaxy;

//   constructor(options: TGameOptions) {
//     this.ui = new Ui({ parent: options.parent, game: this });
//     this.state = gameStatePause;
//     this.galaxy = new Galaxy({ parent: options.parent });
//   }

//   /** show home screen */
//   home(): void {
//     this.ui.show(uiLocationHome);
//   }

//   /** start new game */
//   new(): void {
//     this.ui.show(uiLocationSelectSpecies);
//   }

//   /** save game */
//   save(): void {
//     this.ui.show(uiLocationSave);
//   }

//   /** load game */
//   load(): void {
//     this.ui.show(uiLocationLoad);
//   }

//   /** pause game */
//   pause(): void {
//     this.state = gameStatePause;
//   }

//   /** resume game */
//   resume(): void {
//     this.state = gameStatePlay;
//   }
// }
