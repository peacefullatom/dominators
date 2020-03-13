import React, { createContext, FC, useContext, useMemo, useState } from 'react';

import { galaxyNames } from '../../data/galaxy/galaxy';
import ID from '../../util/id';
import RandomValue from '../../util/randomValue';
import { galaxyDefaultData, galaxyGenerate } from './Galaxy.const';
import { TGalaxyContext, TGalaxyContextGenerate } from './GalaxyContext.types';

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
  const generate = (data?: TGalaxyContextGenerate): void => {
    const { seed, systems } = galaxyGenerate(data?.density);
    setGalaxy({
      ...galaxy,
      id: ID(),
      seed,
      systems,
      name: RandomValue(galaxyNames),
      density: data?.density ?? galaxy.density,
      speciesCount: data?.speciesCount ?? galaxy.speciesCount,
    });
  };
  const value = useMemo(() => ({ galaxy, setGalaxy, generate }), [galaxy]);

  return <GalaxyContext.Provider value={value} {...props} />;
};

export { useGalaxy, GalaxyProvider };
