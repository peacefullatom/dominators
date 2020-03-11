import { TSpecies } from '../../game/galaxy/species/Species.types';
import { atmosphereTypeNitrogenMethane, atmosphereTypeNitrogenOxygen } from '../atmosphere/atmosphere';
import { gravityTypeHigh } from '../gravity/gravity';
import { skillTypeNormal, skillTypeVeryHigh } from '../skill/skill';
import { temperatureTypeCold } from '../temperature/temperature';

export const speciesScientist: Partial<TSpecies> = {
  id: `scientist`,
  name: `scientist`,
  description: `scientist`,
  color: `magenta`,
  flag: ``,
  gravitation: [gravityTypeHigh],
  defyGravity: false,
  atmosphere: [atmosphereTypeNitrogenOxygen, atmosphereTypeNitrogenMethane],
  anaerobic: false,
  temperature: [temperatureTypeCold],
  ignoreTemperature: false,
  construction: skillTypeNormal,
  espionage: skillTypeNormal,
  fleet: skillTypeNormal,
  population: skillTypeNormal,
  research: skillTypeVeryHigh,
  relations: {},
};
