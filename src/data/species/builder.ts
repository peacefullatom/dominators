import { TSpecies } from '../../game/galaxy/species/Species.types';
import { atmosphereTypeHydrogenHelium, atmosphereTypeNitrogenOxygen } from '../atmosphere/atmosphere';
import { gravityTypeLow } from '../gravity/gravity';
import { skillTypeNormal, skillTypeVeryHigh } from '../skill/skill';
import { temperatureTypeNeutral } from '../temperature/temperature';

export const speciesBuilder: Partial<TSpecies> = {
  id: `builder`,
  name: `builder`,
  description: `builder`,
  color: `green`,
  flag: ``,
  gravity: [gravityTypeLow],
  defyGravity: false,
  atmosphere: [atmosphereTypeNitrogenOxygen, atmosphereTypeHydrogenHelium],
  anaerobic: false,
  temperature: [temperatureTypeNeutral],
  ignoreTemperature: false,
  construction: skillTypeVeryHigh,
  espionage: skillTypeNormal,
  fleet: skillTypeNormal,
  population: skillTypeNormal,
  research: skillTypeNormal,
  relations: [],
};
