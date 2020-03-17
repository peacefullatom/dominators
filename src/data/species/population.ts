import { TSpecies } from '../../game/galaxy/species/Species.types';
import { gravityTypeNormal } from '../gravity/gravity';
import { skillTypeVeryHigh, skillTypeVeryLow } from '../skill/skill';

export const speciesPopulation: Partial<TSpecies> = {
  id: `population`,
  name: `population`,
  description: `population`,
  color: `cyan`,
  flag: ``,
  gravity: [gravityTypeNormal],
  defyGravity: false,
  atmosphere: [],
  anaerobic: true,
  temperature: [],
  ignoreTemperature: true,
  construction: skillTypeVeryLow,
  espionage: skillTypeVeryLow,
  fleet: skillTypeVeryLow,
  population: skillTypeVeryHigh,
  research: skillTypeVeryLow,
  relations: [],
};
