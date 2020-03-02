import './game.scss';

import React, { useState } from 'react';

import DataSpeciesHuman from './data/species/human';
import { TSpecies } from './galaxy/species/species';
import UiHome from './ui/home/home';
import UiIntro from './ui/intro/intro';
import UiLoad from './ui/load/load';
import UiSelectSpecies from './ui/selectSpecies/select.species';
import UiSetupSpecies from './ui/setupSpecies/setup.species';
import {
  uiLocationHome,
  uiLocationIntro,
  uiLocationLoad,
  uiLocationSelectGalaxy,
  uiLocationSelectSpecies,
  uiLocationSetupSpecies,
} from './ui/ui.const';

type TGame = {
  view?: string;
};

const Game: React.FC<TGame> = ({ view }) => {
  const [currentView, setCurrentView] = useState(view ?? uiLocationHome);
  const [species, setSpecies] = useState<TSpecies>(DataSpeciesHuman);
  const home = (): void => setCurrentView(uiLocationHome);
  let content: JSX.Element;

  console.log(species);

  if (currentView === uiLocationIntro) {
    content = <UiIntro home={home}></UiIntro>;
  } else if (currentView === uiLocationLoad) {
    content = <UiLoad home={home}></UiLoad>;
  } else if (currentView === uiLocationSelectSpecies) {
    content = (
      <UiSelectSpecies
        species={species}
        setSpecies={setSpecies}
        home={home}
        back={home}
        next={(): void => setCurrentView(uiLocationSetupSpecies)}
        nextDisabled={!species}
      ></UiSelectSpecies>
    );
  } else if (currentView === uiLocationSetupSpecies) {
    content = (
      <UiSetupSpecies
        species={species}
        setSpecies={setSpecies}
        home={home}
        back={(): void => setCurrentView(uiLocationSelectSpecies)}
        next={(): void => setCurrentView(uiLocationSelectGalaxy)}
      ></UiSetupSpecies>
    );
  } else {
    content = (
      <UiHome
        intro={(): void => setCurrentView(uiLocationIntro)}
        start={(): void => setCurrentView(uiLocationSelectSpecies)}
        load={(): void => setCurrentView(uiLocationLoad)}
      ></UiHome>
    );
  }

  return <div className='game'>{content}</div>;
};

export default Game;
