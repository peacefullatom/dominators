import { atmosphereType } from '../../common/atmosphere.types';
import { temperatureType } from '../../common/temperature.types';
import { TFacility } from './facility/facility.type';

/** planet description */
export type TPlanet = {
  /** id of the planet */
  id: string;
  /** name of the planet */
  name: string;
  /**
   * - flag of the home planet of the species
   * - use preset for the designed species
   */
  homePlanet: boolean;
  /** owner species */
  species: string;
  /**
   * - planet size
   * - refer to _planetSizeMin_ and _planetSizeMax_ for the
   * edge values
   */
  size: number;
  /**
   * - level of abundance
   * - refer to _planetAbundanceMin_ and _planetAbundanceMax_
   * for the edge values
   */
  abundance: number;
  /** atmosphere type */
  atmosphere: atmosphereType;
  /** planet temperature */
  temperature: temperatureType;
  /**
   * - maximum amount of species on the planet (billions)
   * @formula population = initialPopulation + ?
   */
  population: number;
  /**
   * - initial maximum amount of species on the planet
   * @formula initialPopulation = size * abundance
   */
  initialPopulation: number;
  /**
   * - current maximum amount of the species on the planet
   * @formula maximumPopulation = initialPopulation
   */
  maximumPopulation: number;
  /**
   * - rate of population growth per cycle. refer to
   * planetGrowthRateMin and planetGrowthRateMax for
   * the edge values
   * @formula growthRate = initialGrowthRate + ?
   */
  growthRate: number;
  /**
   * - initial growth rate
   * - depends on abundance
   * @dependencies external dependencies
   * - atmosphere types suitable for the current species
   * - temperature range suitable for the current species
   * - initial amount of colonists
   * @values values from external dependancies
   * - _atmosphereFit_ = species.atmosphere[].contains[planet.atmosphere]
   * - _temperatureFit_ = species.temperature[].contains[planet.temperature]
   * - _numberOfColonists_ = ship.colonists
   * @formula initialGrowthRate = abundance * atmosphereFit * temperatureFit + numberOfColonists + ?
   */
  initialGrowthRate: number;
  /**
   * - number of espionage points produced by planet per cycle
   * - used to perform espionage operations
   * @dependencies external dependencies
   * - _governorEspionageSkill_ =
   * @formula espionagePoints = population * ?
   */
  espionagePoints: number;
  /**
   * - number of construction points produced by planet per cycle
   * - used to build planetary ant orbital structures
   * - used to build ships if space dock is available
   * @formula constructionPoints = population * ?
   */
  constructionPoints: number;
  /**
   * - number of research points produced by planet per cycle
   * - used to perform global research program
   * @formula researchPoints = population * ?
   */
  researchPoints: number;
  /** list of facilities */
  facilities: TFacility[];
};
