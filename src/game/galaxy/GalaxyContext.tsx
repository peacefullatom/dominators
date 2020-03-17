import React, { createContext, FC, useContext, useMemo, useState } from 'react';

import { galaxyNames } from '../../data/galaxy/galaxy';
import ID from '../../util/id';
import RandomValue from '../../util/randomValue';
import { galaxyDefaultData, galaxyGenerate, galaxySpecies } from './Galaxy.const';
import { TGalaxyContext, TGalaxyContextGenerate } from './GalaxyContext.types';
import { galaxyContextPlanets, galaxyContextSystemCoordinates } from './GalaxyContext.utils';
import { TSystem } from './system/System.types';

const GalaxyContext = createContext<TGalaxyContext | null>(null);

const useGalaxy = (): TGalaxyContext => {
  const context = useContext(GalaxyContext);
  if (!context) {
    throw new Error(`useGalaxy must be used within GalaxyProvider`);
  }
  return context;
};

const GalaxyProvider: FC = props => {
  const [galaxy, setGalaxy] = useState(galaxyDefaultData);
  const [system, setSystem] = useState<TSystem>();
  const reset = (): void => setGalaxy(galaxyDefaultData);
  const generate = (data?: TGalaxyContextGenerate): void => {
    const density = data?.density ?? galaxy.density;
    const speciesCount = data?.speciesCount ?? galaxy.speciesCount;
    const species = galaxySpecies(speciesCount);
    const { seed, systems } = galaxyGenerate(
      species.concat(galaxy.player),
      density
    );
    setGalaxy({
      ...galaxy,
      id: ID(),
      seed,
      systems,
      name: RandomValue(galaxyNames),
      density,
      speciesCount,
      species,
    });
  };
  const cycle = (): void => {
    const date = galaxy.date + 1;
    const systems = galaxy.systems.map(system => {
      system.coordinates = galaxyContextSystemCoordinates(system);
      system.planets = galaxyContextPlanets(system.planets);
      return system;
    });
    setGalaxy({ ...galaxy, date, systems });
  };
  const value = useMemo(
    () => ({ galaxy, setGalaxy, system, setSystem, reset, generate, cycle }),
    [galaxy, system]
  );

  return <GalaxyContext.Provider value={value} {...props} />;
};

export { useGalaxy, GalaxyProvider };
