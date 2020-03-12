import { galaxyDensityMedium, galaxyNames, galaxySpeciesCountDefault } from '../../data/galaxy/galaxy';
import { speciesHuman } from '../../data/species/human';
import ID from '../../util/id';
import CreateDistributedPoints from '../../util/poisson';
import RandomValue from '../../util/randomValue';
import { TGalaxyData, TGalaxyGenerate } from './Galaxy.types';
import { TSpecies } from './species/Species.types';
import { systemNames } from './system/System.const';
import { TSystem } from './system/System.types';

export const galaxyGenerate = (density?: number): TGalaxyGenerate => {
  const seed = CreateDistributedPoints(density ?? galaxyDensityMedium);
  const names = systemNames
    .sort(() => (Math.random() >= 0.5 ? -1 : 1))
    .splice(0, seed.length);
  const systems: TSystem[] = seed.map((coordinates, index) => ({
    id: ID(),
    name: names[index],
    planets: [],
    coordinates,
  }));
  return { seed, systems };
};

const { seed, systems } = galaxyGenerate();

export const galaxyDefaultData: TGalaxyData = {
  id: ID(),
  name: RandomValue(galaxyNames),
  density: galaxyDensityMedium,
  seed,
  systems,
  speciesCount: galaxySpeciesCountDefault,
  player: speciesHuman as TSpecies,
  species: [],
};
