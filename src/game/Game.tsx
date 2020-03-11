import React, { useState } from 'react';

import { galaxyDensityMedium, galaxyNames, galaxySpeciesCountDefault } from '../data/galaxy/galaxy';
import { speciesHuman } from '../data/species/human';
import CreateDistributedPoints from '../util/poisson';
import RandomValue from '../util/randomValue';
import CommandCenter from './command-center/CommandCenter';
import { TGalaxyData } from './galaxy/Galaxy.types';
import { TSpecies } from './galaxy/species/Species.types';
import { gameLocationGalaxy, gameLocationHome } from './Game.const';
import { TGame } from './Game.types';
import Menu from './menu/Menu';

const Game: React.FC<TGame> = ({ view }) => {
  const [screen, setScreen] = useState(view ?? gameLocationHome);
  const [galaxyData, setGalaxyData] = useState<TGalaxyData>({
    id: '',
    name: RandomValue(galaxyNames),
    density: galaxyDensityMedium,
    seed: CreateDistributedPoints(galaxyDensityMedium),
    speciesCount: galaxySpeciesCountDefault,
    player: speciesHuman as TSpecies,
    species: [],
    systems: [],
  });

  if (screen === gameLocationGalaxy) {
    return (
      <CommandCenter
        setView={setScreen}
        galaxyData={galaxyData}
        setGalaxyData={setGalaxyData}
      />
    );
  }

  return (
    <Menu
      setGameView={setScreen}
      galaxyData={galaxyData}
      setGalaxyData={setGalaxyData}
    />
  );
};

export default Game;
