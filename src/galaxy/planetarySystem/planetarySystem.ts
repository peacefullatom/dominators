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

const PlanetarySystem = (speciesData: TSpecies[]): TPlanetarySystem => {
  const name = Name(planetarySystemName);
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
