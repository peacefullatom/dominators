import { galaxyDensityMedium, galaxySpeciesCountDefault } from '../../data/galaxy/galaxy';
import { gravityTypeHigh, gravityTypeNormal, gravityTypes } from '../../data/gravity/gravity';
import { speciesBuilder } from '../../data/species/builder';
import { speciesHuman } from '../../data/species/human';
import { speciesNomad } from '../../data/species/nomad';
import { speciesPopulation } from '../../data/species/population';
import { speciesScientist } from '../../data/species/scientist';
import { speciesSpy } from '../../data/species/spy';
import { TPoint } from '../../types';
import ID from '../../util/id';
import CreateDistributedPoints from '../../util/poisson';
import RandomNumber from '../../util/randomNumber';
import RandomValue from '../../util/randomValue';
import { TGalaxyData, TGalaxyGenerate } from './Galaxy.types';
import { speciesRelationsUnknown } from './species/Species.const';
import { TSpecies } from './species/Species.types';
import { governorSkillLevelDefault } from './system/governor/Governor.const';
import { TGovernor } from './system/governor/Governor.types';
import {
  planetAbundanceMaximum,
  planetSizeHighGravity,
  planetSizeLowGravity,
  planetSizeMaximum,
  planetSizeNormalGravity,
} from './system/planet/Planet.const';
import { TPlanet } from './system/planet/Planet.types';
import { starClass } from './system/star/Star.const';
import {
  systemNames,
  systemPlanetsCountMaximum,
  systemPlanetsCountMinimum,
  systemShapeCircle,
  systemStatusPeaceful,
} from './system/System.const';
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

const planetSize = (gravity: number[], defyGravity: boolean): number => {
  if (defyGravity || gravity.indexOf(gravityTypeHigh)) {
    return planetSizeHighGravity;
  }

  if (gravity.indexOf(gravityTypeNormal)) {
    return planetSizeNormalGravity;
  }

  return planetSizeLowGravity;
};

const populatePlanet = (planet: TPlanet, species: TSpecies): void => {
  planet.populated = true;
  planet.abundance = planetAbundanceMaximum;
  planet.size = planetSize(species.gravity, species.defyGravity);
  planet.gravity = [
    RandomValue(species.defyGravity ? gravityTypes : species.gravity),
  ];
  planet.atmosphere = [RandomValue(species.atmosphere)];
  planet.temperature = [RandomValue(species.temperature)];
  planet.constructionPoints = 0;
  planet.espionagePoints = 0;
  planet.researchPoints = 0;
  planet.populationPoints = 0;
  planet.populationMaximumInitial = 0;
  planet.populationMaximum = 0;
  planet.population = 0;
  planet.defensePointsMaximumInitial = 0;
  planet.defensePointsMaximum = 0;
  planet.defensePoints = 0;
  planet.facilities = [];
  planet.species = species;
};

const populateSystem = (
  system: TSystem,
  species: TSpecies,
  governor: TGovernor
): void => {
  if (species.player) {
    system.coordinates.shape = systemShapeCircle;
    system.coordinates.status = systemStatusPeaceful;
  }
  system.species = [
    {
      data: species,
      governor,
      discovered: true,
      homeSystem: true,
      canObserve: true,
      isHabitant: true,
    },
  ];
  system.populated = true;

  populatePlanet(RandomValue(system.planets), species);
};

const populateGalaxy = (systems: TSystem[], species: TSpecies[]): TSystem[] => {
  species.forEach(s => {
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
    s.relations = species
      .filter(r => r.id !== s.id)
      .map(r => ({
        species: r.id,
        relations: speciesRelationsUnknown,
        activities: { research: false, routeSharing: false, trade: false },
      }));
    populateSystem(findUnpopulatedSystem(systems), s, governor);
  });
  console.log(systems.filter(s => s.populated));
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

    const angle = (a: TPoint, b: TPoint): number => {
      return (Math.atan2(a.y - b.y, a.x - b.x) * 180) / Math.PI + 180;
    };

    pairs.forEach(p => {
      const { s, d } = p;
      if (d) {
        s.wormholes.push({
          id: d.id,
          angle: angle(d.coordinates, s.coordinates),
        });
        d.wormholes.push({
          id: s.id,
          angle: angle(s.coordinates, d.coordinates),
        });
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
  const names = [...systemNames]
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
