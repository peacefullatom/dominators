import { TSpecies } from '../../game/galaxy/species/Species.types';
import { atmosphereTypeNitrogenCarbonDioxide, atmosphereTypeNitrogenOxygen } from '../atmosphere/atmosphere';
import { skillTypeHigh, skillTypeNormal, skillTypeVeryHigh } from '../skill/skill';
import { temperatureTypeNeutral } from '../temperature/temperature';

export const speciesNomad: Partial<TSpecies> = {
  id: `nomad`,
  name: `nomad`,
  description: `nomad`,
  color: `blue`,
  flag: ``,
  gravitation: [],
  defyGravity: true,
  atmosphere: [
    atmosphereTypeNitrogenOxygen,
    atmosphereTypeNitrogenCarbonDioxide,
  ],
  anaerobic: false,
  temperature: [temperatureTypeNeutral],
  ignoreTemperature: false,
  construction: skillTypeHigh,
  espionage: skillTypeNormal,
  fleet: skillTypeVeryHigh,
  population: skillTypeNormal,
  research: skillTypeNormal,
  relations: {},
};
