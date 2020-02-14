import ID from '../util/id';
import RandomValue from '../util/randomValue';
import { galaxyName } from './galaxy.const';
import { TGalaxy } from './galaxy.types';
import PlanetarySystem from './planetarySystem/planetarySystem';
import Species from './species/species';

const Galaxy = (): TGalaxy => {
  const species = Array.from({ length: 10 }, () => Species());
  const usedNames: string[] = [];
  const planetarySystems = Array.from({ length: 100 }, () => {
    const system = PlanetarySystem(species, usedNames);
    usedNames.push(system.name);
    return system;
  });
  return {
    id: ID(),
    name: RandomValue(galaxyName),
    planetarySystems,
    species,
  };
};

export default Galaxy;
