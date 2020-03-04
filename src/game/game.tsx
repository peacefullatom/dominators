import './game.scss';

import React, { useState } from 'react';

import DataSpeciesHuman from './data/species/human';
import Galaxy from './galaxy/galaxy';
import { TSpecies } from './galaxy/species/species';
import UiCommandCenter from './ui/commandCenter/command.center';
import UiEspionage from './ui/espionage/espionage';
import UiFleet from './ui/fleet/fleet';
import UiHome from './ui/home/home';
import UiIntro from './ui/intro/intro';
import UiLoad from './ui/load/load';
import UiMenu from './ui/menu/menu';
import UiPlanets from './ui/planets/planets';
import UiResearch from './ui/research/research';
import UiSelectGalaxy from './ui/selectGalaxy/select.galaxy';
import UiSelectSpecies from './ui/selectSpecies/select.species';
import UiSetupSpecies from './ui/setupSpecies/setup.species';
import UiStats from './ui/stats/stats';
import {
  uiLocationCommandCenter,
  uiLocationEspionage,
  uiLocationFleet,
  uiLocationHome,
  uiLocationIntro,
  uiLocationLoad,
  uiLocationMenu,
  uiLocationPlanets,
  uiLocationResearch,
  uiLocationSelectGalaxy,
  uiLocationSelectSpecies,
  uiLocationSetupSpecies,
  uiLocationStats,
} from './ui/ui.const';

type TGame = {
  view?: string;
};

const Game: React.FC<TGame> = ({ view }) => {
  const [currentView, setCurrentView] = useState(view ?? uiLocationHome);
  const [species, setSpecies] = useState<TSpecies>(DataSpeciesHuman);
  const [galaxy] = useState(new Galaxy());
  const home = (): void => {
    galaxy.reset();
    setSpecies(DataSpeciesHuman);
    setCurrentView(uiLocationHome);
  };
  const menu = (): void => setCurrentView(uiLocationMenu);
  const center = (): void => setCurrentView(uiLocationCommandCenter);
  const fleet = (): void => setCurrentView(uiLocationFleet);
  const research = (): void => setCurrentView(uiLocationResearch);
  const espionage = (): void => setCurrentView(uiLocationEspionage);
  const planets = (): void => setCurrentView(uiLocationPlanets);
  const stats = (): void => setCurrentView(uiLocationStats);
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
    content = (
      <UiCommandCenter
        galaxy={galaxy}
        species={species}
        action={menu}
        fleet={fleet}
        research={research}
        espionage={espionage}
        planets={planets}
        stats={stats}
      ></UiCommandCenter>
    );
  } else if (currentView === uiLocationFleet) {
    content = <UiFleet galaxy={galaxy} action={center}></UiFleet>;
  } else if (currentView === uiLocationResearch) {
    content = <UiResearch galaxy={galaxy} action={center}></UiResearch>;
  } else if (currentView === uiLocationEspionage) {
    content = <UiEspionage galaxy={galaxy} action={center}></UiEspionage>;
  } else if (currentView === uiLocationPlanets) {
    content = <UiPlanets galaxy={galaxy} action={center}></UiPlanets>;
  } else if (currentView === uiLocationStats) {
    content = <UiStats galaxy={galaxy} action={center}></UiStats>;
  } else if (currentView === uiLocationMenu) {
    content = <UiMenu home={home}></UiMenu>;
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
