import './Start.scss';

import React, { useEffect, useState } from 'react';

import { gameDefaultLocation, gameLocationGalaxy } from '../../Game.const';
import SelectGalaxy from './select-galaxy/SelectGalaxy';
import SelectSpecies from './select-species/SelectSpecies';
import SetupSpecies from './setup-species/SetupSpecies';
import { startLocationSelectGalaxy, startLocationSetupSpecies } from './Start.const';
import { TStart } from './Start.types';

const Start: React.FC<TStart> = ({ startView, setView, setGameView }) => {
  const [screen, setScreen] = useState(startView ?? gameDefaultLocation);

  useEffect(() => {
    // setGameView(gameLocationGalaxy);
  }, [screen]);

  if (screen === startLocationSelectGalaxy) {
    return (
      <SelectGalaxy
        setView={setView}
        back={(): void => setScreen(startLocationSetupSpecies)}
        forward={(): void => setGameView(gameLocationGalaxy)}
      />
    );
  }

  if (screen === startLocationSetupSpecies) {
    return (
      <SetupSpecies
        setView={setView}
        back={(): void => setScreen(gameDefaultLocation)}
        forward={(): void => setScreen(startLocationSelectGalaxy)}
      />
    );
  }

  return (
    <SelectSpecies
      setView={setView}
      forward={(): void => setScreen(startLocationSetupSpecies)}
    />
  );
};

export default Start;
