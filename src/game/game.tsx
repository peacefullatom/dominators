import './game.scss';

import React, { useState } from 'react';

import DataSpeciesHuman from './data/species/human';
import Galaxy from './galaxy/galaxy';
import { TSpecies } from './galaxy/species/species';
import UiCommandCenter from './ui/commandCenter/command.center';
import UiHome from './ui/home/home';
import UiIntro from './ui/intro/intro';
import UiLoad from './ui/load/load';
import UiSelectGalaxy from './ui/selectGalaxy/select.galaxy';
import UiSelectSpecies from './ui/selectSpecies/select.species';
import UiSetupSpecies from './ui/setupSpecies/setup.species';
import {
  uiLocationCommandCenter,
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
  const galaxy = new Galaxy();
  const home = (): void => setCurrentView(uiLocationHome);
  let content: JSX.Element;

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
  } else if (currentView === uiLocationSelectGalaxy) {
    content = (
      <UiSelectGalaxy
        home={home}
        back={(): void => setCurrentView(uiLocationSetupSpecies)}
        next={(): void => setCurrentView(uiLocationCommandCenter)}
        galaxy={galaxy}
      ></UiSelectGalaxy>
    );
  } else if (currentView === uiLocationCommandCenter) {
    content = <UiCommandCenter></UiCommandCenter>;
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
