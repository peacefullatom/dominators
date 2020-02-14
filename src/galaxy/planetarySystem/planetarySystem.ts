import ID from '../../util/id';
import Name from '../../util/name';
import RandomNumber from '../../util/randomNumber';
import Governor from './governor/governor';
import Planet from './planet/planet';
import {
  planetarySystemName,
  planetarySystemPortalsMax,
  planetarySystemPortalsMin,
  planetarySystemSizeMax,
  planetarySystemSizeMin,
} from './planetarySystem.const';
import { TPlanetarySystem } from './planetarySystem.types';
import Portal from './portal/portal';
import Star from './star/star';

const PlanetarySystem = (): TPlanetarySystem => {
  const name = Name(planetarySystemName);
  return {
    id: ID(),
    name,
    governor: Governor(),
    planets: Array.from(
      { length: RandomNumber(planetarySystemSizeMax, planetarySystemSizeMin) },
      (value, index) => Planet(index, name)
    ),
    portals: Array.from(
      {
        length: RandomNumber(
          planetarySystemPortalsMax,
          planetarySystemPortalsMin
        ),
      },
      value => Portal(``, ``)
    ),
    star: Star(name),
  };
};

export default PlanetarySystem;
