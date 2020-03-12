import './Start.scss';

import React, { lazy, useState } from 'react';

import { gameDefaultLocation, gameLocationGalaxy } from '../../Game.const';
import { startLocationSelectGalaxy, startLocationSetupSpecies } from './Start.const';
import { TStart } from './Start.types';

const Start: React.FC<TStart> = ({ startView, setView, setGameView }) => {
  const [screen, setScreen] = useState(startView ?? gameDefaultLocation);
  const SelectSpecies = lazy(() => import('./select-species/SelectSpecies'));
  const SetupSpecies = lazy(() => import('./setup-species/SetupSpecies'));
  const SelectGalaxy = lazy(() => import('./select-galaxy/SelectGalaxy'));

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
