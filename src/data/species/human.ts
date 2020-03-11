import { TSpecies } from '../../game/galaxy/species/Species.types';
import { atmosphereTypeNitrogenOxygen } from '../atmosphere/atmosphere';
import { gravityTypeNormal } from '../gravity/gravity';
import { skillTypeNormal } from '../skill/skill';
import { temperatureTypeNeutral } from '../temperature/temperature';

export const speciesHuman: Partial<TSpecies> = {
  id: `human`,
  name: `human`,
  description: `human`,
  color: `red`,
  flag: ``,
  gravitation: [gravityTypeNormal],
  defyGravity: false,
  atmosphere: [atmosphereTypeNitrogenOxygen],
  anaerobic: false,
  temperature: [temperatureTypeNeutral],
  ignoreTemperature: false,
  construction: skillTypeNormal,
  espionage: skillTypeNormal,
  fleet: skillTypeNormal,
  population: skillTypeNormal,
  research: skillTypeNormal,
  relations: {},
};
