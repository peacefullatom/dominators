import { TSpecies } from '../../game/galaxy/species/Species.types';
import {
  atmosphereTypeHydrogenHelium,
  atmosphereTypeNitrogenCarbonDioxide,
  atmosphereTypeNitrogenOxygen,
} from '../atmosphere/atmosphere';
import { gravityTypeLow, gravityTypeNormal } from '../gravity/gravity';
import { skillTypeNormal, skillTypeVeryHigh } from '../skill/skill';
import { temperatureTypeHot } from '../temperature/temperature';

export const speciesSpy: Partial<TSpecies> = {
  id: `spy`,
  name: `spy`,
  description: `spy`,
  color: `yellow`,
  flag: ``,
  gravitation: [gravityTypeLow, gravityTypeNormal],
  defyGravity: false,
  atmosphere: [
    atmosphereTypeNitrogenOxygen,
    atmosphereTypeNitrogenCarbonDioxide,
    atmosphereTypeHydrogenHelium,
  ],
  anaerobic: false,
  temperature: [temperatureTypeHot],
  ignoreTemperature: false,
  construction: skillTypeNormal,
  espionage: skillTypeVeryHigh,
  fleet: skillTypeNormal,
  population: skillTypeNormal,
  research: skillTypeNormal,
  relations: {},
};
