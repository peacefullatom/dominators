import './Start.scss';

import React, { useState } from 'react';

import { gameDefaultLocation, gameLocationGalaxy } from '../Game.const';
import SelectGalaxy from './select-galaxy/SelectGalaxy';
import SelectSpecies from './select-species/SelectSpecies';
import SetupSpecies from './setup-species/SetupSpecies';
import { startLocationSelectGalaxy, startLocationSetupSpecies } from './Start.const';
import { TStart } from './Start.types';

const Start: React.FC<TStart> = ({
  view,
  setView,
  galaxyData: galaxyData,
  setGalaxyData: setgalaxyData,
  setGameView,
}) => {
  const [screen, setScreen] = useState(view ?? gameDefaultLocation);

  if (screen === startLocationSelectGalaxy) {
    return (
      <SelectGalaxy
        galaxyData={galaxyData}
        setGalaxyData={setgalaxyData}
        setView={setView}
        back={(): void => setScreen(startLocationSetupSpecies)}
        forward={(): void => setGameView(gameLocationGalaxy)}
      />
    );
  }

  if (screen === startLocationSetupSpecies) {
    return (
      <SetupSpecies
        galaxyData={galaxyData}
        setGalaxyData={setgalaxyData}
        setView={setView}
        back={(): void => setScreen(gameDefaultLocation)}
        forward={(): void => setScreen(startLocationSelectGalaxy)}
      />
    );
  }

  return (
    <SelectSpecies
      galaxyData={galaxyData}
      setGalaxyData={setgalaxyData}
      setView={setView}
      forward={(): void => setScreen(startLocationSetupSpecies)}
    />
  );
};

export default Start;
