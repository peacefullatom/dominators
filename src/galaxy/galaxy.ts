import ID from '../util/id';
import RandomValue from '../util/randomValue';
import { galaxyName } from './galaxy.const';
import { TGalaxy } from './galaxy.types';
import PlanetarySystem from './planetarySystem/planetarySystem';
import Species from './species/species';

const Galaxy = (): TGalaxy => {
  const species = Array.from({ length: 10 }, () => Species());
  return {
    id: ID(),
    name: RandomValue(galaxyName),
    planetarySystems: Array.from({ length: 100 }, () =>
      PlanetarySystem(species)
    ),
    species,
  };
};

export default Galaxy;
