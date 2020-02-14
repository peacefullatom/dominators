import ID from '../../util/id';
import Name from '../../util/name';
import RandomNumber from '../../util/randomNumber';
import { TSpecies } from '../species/species.types';
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

const generateName = (usedNames: string[]): string => {
  let name = Name(planetarySystemName);
  if (usedNames.indexOf(name) !== -1) {
    while (usedNames.indexOf(name) === -1) {
      name = Name(planetarySystemName);
    }
  }
  return name;
};

const PlanetarySystem = (
  speciesData: TSpecies[],
  usedNames: string[]
): TPlanetarySystem => {
  const name = generateName(usedNames);
  const species = Array.from(
    { length: speciesData.length },
    (value, index) => ({
      discovered: false,
      speciesId: speciesData[index].id,
    })
  );
  const planets = Array.from(
    { length: RandomNumber(planetarySystemSizeMax, planetarySystemSizeMin) },
    (value, index) => Planet(index, name)
  );
  const portals = Array.from(
    {
      length: RandomNumber(
        planetarySystemPortalsMax,
        planetarySystemPortalsMin
      ),
    },
    value => Portal(``, ``)
  );
  return { id: ID(), name, species, planets, portals, star: Star(name) };
};

export default PlanetarySystem;
