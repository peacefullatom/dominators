import ID from '../util/id';
import RandomValue from '../util/randomValue';
import { galaxyName } from './galaxy.const';
import { TGalaxy } from './galaxy.types';
import PlanetarySystem from './planetarySystem/planetarySystem';
import Species from './species/species';

const Galaxy = (): TGalaxy => ({
  id: ID(),
  name: RandomValue(galaxyName),
  planetarySystems: Array.from({ length: 2 }, () => PlanetarySystem()),
  species: Array.from({ length: 2 }, () => Species()),
});

export default Galaxy;
