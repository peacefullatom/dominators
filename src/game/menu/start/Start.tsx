import './Start.scss';

import React, { lazy } from 'react';

import SelectGalaxy from './select-galaxy/SelectGalaxy';
import SelectSpecies from './select-species/SelectSpecies';
import SetupSpecies from './setup-species/SetupSpecies';
import { startLocationSelectGalaxy, startLocationSetupSpecies } from './Start.const';
import { TStart } from './Start.types';
import { useStart } from './StartContext';

const Start: React.FC<TStart> = () => {
  const { view } = useStart();

  if (view === startLocationSelectGalaxy) {
    return <SelectGalaxy />;
  }

  if (view === startLocationSetupSpecies) {
    return <SetupSpecies />;
  }

  return <SelectSpecies />;
};

export default Start;
