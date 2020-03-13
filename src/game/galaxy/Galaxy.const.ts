import { galaxyDensityMedium, galaxyNames, galaxySpeciesCountDefault } from '../../data/galaxy/galaxy';
import { speciesBuilder } from '../../data/species/builder';
import { speciesHuman } from '../../data/species/human';
import { speciesNomad } from '../../data/species/nomad';
import { speciesPopulation } from '../../data/species/population';
import { speciesScientist } from '../../data/species/scientist';
import { speciesSpy } from '../../data/species/spy';
import ID from '../../util/id';
import CreateDistributedPoints from '../../util/poisson';
import RandomValue from '../../util/randomValue';
import { TGalaxyData, TGalaxyGenerate } from './Galaxy.types';
import { TSpecies } from './species/Species.types';
import { systemNames } from './system/System.const';
import { TSystem } from './system/System.types';

export const galaxySpecies = (speciesCount?: number): TSpecies[] => {
  return [
    speciesBuilder as TSpecies,
    speciesHuman as TSpecies,
    speciesNomad as TSpecies,
    speciesPopulation as TSpecies,
    speciesScientist as TSpecies,
    speciesSpy as TSpecies,
  ]
    .sort(() => (Math.random() >= 0.5 ? -1 : 1))
    .slice(0, (speciesCount ?? galaxySpeciesCountDefault) - 1);
};

const findUnpopulatedSystem = (systems: TSystem[]): TSystem => {
  const lookout = (data: TSystem[]): TSystem => {
    const index = Math.floor(Math.random() * data.length);
    const s = data[index];
    if (data.length && s.populated) {
      data.splice(index, 1);
      return lookout(data);
    }
    return s;
  };

  return lookout([...systems]);
};

const populate = (systems: TSystem[], species: TSpecies[]): TSystem[] => {
  species.forEach(s => {
    const system = findUnpopulatedSystem(systems);
    system.populated = true;
  });
  return systems;
};

export const galaxyGenerate = (
  species: TSpecies[],
  density?: number
): TGalaxyGenerate => {
  const seed = CreateDistributedPoints(density ?? galaxyDensityMedium);
  const names = systemNames
    .sort(() => (Math.random() >= 0.5 ? -1 : 1))
    .splice(0, seed.length);
  const systems: TSystem[] = populate(
    seed.map((coordinates, index) => ({
      id: ID(),
      name: names[index],
      populated: false,
      planets: [],
      coordinates,
    })),
    species
  );
  console.log(systemNames.length, systems.length);
  return { seed, systems };
};

const { seed, systems } = galaxyGenerate(galaxySpecies());

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
