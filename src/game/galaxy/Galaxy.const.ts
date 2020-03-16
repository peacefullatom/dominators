import { galaxyDensityMedium, galaxySpeciesCountDefault } from '../../data/galaxy/galaxy';
import { speciesBuilder } from '../../data/species/builder';
import { speciesHuman } from '../../data/species/human';
import { speciesNomad } from '../../data/species/nomad';
import { speciesPopulation } from '../../data/species/population';
import { speciesScientist } from '../../data/species/scientist';
import { speciesSpy } from '../../data/species/spy';
import ID from '../../util/id';
import CreateDistributedPoints from '../../util/poisson';
import RandomNumber from '../../util/randomNumber';
import RandomValue from '../../util/randomValue';
import { TGalaxyData, TGalaxyGenerate } from './Galaxy.types';
import { TSpecies } from './species/Species.types';
import { governorSkillLevelDefault } from './system/governor/Governor.const';
import { TGovernor } from './system/governor/Governor.types';
import { planetAbundanceMaximum, planetSizeMaximum } from './system/planet/Planet.const';
import { TPlanet } from './system/planet/Planet.types';
import { starClass } from './system/star/Star.const';
import { systemNames, systemPlanetsCountMaximum, systemPlanetsCountMinimum } from './system/System.const';
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

const populateGalaxy = (systems: TSystem[], species: TSpecies[]): TSystem[] => {
  species.forEach(s => {
    const system = findUnpopulatedSystem(systems);
    const governor: TGovernor = {
      id: ID(),
      avatar: ``,
      construction: governorSkillLevelDefault,
      espionage: governorSkillLevelDefault,
      fleet: governorSkillLevelDefault,
      population: governorSkillLevelDefault,
      research: governorSkillLevelDefault,
    };
    s.leadOfConstruction = governor;
    s.leadOfEspionage = governor;
    s.leadOfFleet = governor;
    s.leadOfPopulation = governor;
    s.leadOfResearch = governor;
    system.species = [
      {
        species: s,
        governor,
        discovered: true,
        homeSystem: true,
        observable: true,
        populated: true,
      },
    ];
    system.populated = true;
  });
  return systems;
};

const generatePlanets = (name: string): TPlanet[] => {
  const orbits = Array.from(
    { length: systemPlanetsCountMaximum - 1 },
    (v, i) => i + 1
  );
  const planetsCount = RandomNumber(
    systemPlanetsCountMaximum,
    systemPlanetsCountMinimum
  );
  let length = systemPlanetsCountMaximum - planetsCount;
  while (--length) {
    const index = RandomNumber(orbits.length);
    orbits.splice(index, 1);
  }
  const planets: TPlanet[] = Array.from({ length: planetsCount }, (v, i) => {
    const orbit = orbits[i];
    return {
      id: ID(),
      name: `${name}-${orbit + 1}`,
      populated: false,
      abundance: RandomNumber(planetAbundanceMaximum, 1),
      size: RandomNumber(planetSizeMaximum, 1),
      speed: 0,
      position: RandomNumber(360),
      orbit,
      gravity: [],
      atmosphere: [],
      temperature: [],
      constructionPoints: 0,
      espionagePoints: 0,
      researchPoints: 0,
      populationPoints: 0,
      populationMaximumInitial: 0,
      populationMaximum: 0,
      population: 0,
      defensePointsMaximumInitial: 0,
      defensePointsMaximum: 0,
      defensePoints: 0,
      facilities: [],
    };
  });
  return planets;
};

const linkSystems = (systems: TSystem[]): void => {
  const orphans = systems.filter(o => !o.wormholes.length);
  if (orphans.length) {
    const list = systems.filter(s => s.wormholes.length);
    const sources = list.length ? list : [RandomValue(systems)];
    const destinations = systems.filter(s => !s.wormholes.length);

    const pairs = sources
      .map(s => {
        const d = destinations
          .filter(d => d.id !== s.id)
          .map(d => ({
            d,
            r: Math.hypot(
              s.coordinates.x - d.coordinates.x,
              s.coordinates.y - d.coordinates.y
            ),
          }))
          .sort((a, b) => a.r - b.r)
          .shift();
        return { s, d: d?.d, r: d?.r };
      })
      .sort((a, b) => (a?.r ?? 0) - (b?.r ?? 0))
      .slice(0, RandomNumber(3));

    pairs.forEach(p => {
      const { s, d } = p;
      if (d) {
        s.wormholes.push(d.id);
        d.wormholes.push(s.id);
      }
    });

    if (orphans.length) {
      linkSystems(systems);
    }
  }
};

export const galaxyGenerate = (
  species: TSpecies[],
  density?: number
): TGalaxyGenerate => {
  console.log(species);
  const seed = CreateDistributedPoints(density ?? galaxyDensityMedium);
  const names = systemNames
    .sort(() => (Math.random() >= 0.5 ? -1 : 1))
    .splice(0, seed.length);
  const systems: TSystem[] = populateGalaxy(
    seed.map((coordinates, index) => {
      const name = names[index];
      return {
        id: ID(),
        name,
        populated: false,
        star: RandomValue(starClass),
        planets: generatePlanets(name),
        wormholes: [],
        species: [],
        coordinates,
      };
    }),
    species
  );
  linkSystems(systems);
  return { seed, systems };
};

export const galaxyDefaultData: TGalaxyData = {
  id: ID(),
  name: '',
  date: 0,
  density: galaxyDensityMedium,
  seed: [],
  systems: [],
  speciesCount: galaxySpeciesCountDefault,
  player: { ...(speciesHuman as TSpecies), player: true },
  species: [],
};
