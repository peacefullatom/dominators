import {
  atmosphereTypeHydrogenHelium,
  atmosphereTypeNitrogenCarbonDioxide,
  atmosphereTypeNitrogenOxygen,
} from '../../galaxy/atmosphere/atmosphere';
import { gravityTypeLow, gravityTypeNormal } from '../../galaxy/gravity/gravity';
import { skillTypeNormal, skillTypeVeryHigh } from '../../galaxy/skill/skill';
import Species from '../../galaxy/species/species';
import { temperatureTypeHot } from '../../galaxy/temperature/temperature';

const DataSpeciesSpy = Species({
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
  reproduction: skillTypeNormal,
  research: skillTypeNormal,
  relations: {},
});

export default DataSpeciesSpy;
