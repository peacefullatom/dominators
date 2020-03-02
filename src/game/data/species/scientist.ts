import { atmosphereTypeNitrogenMethane, atmosphereTypeNitrogenOxygen } from '../../galaxy/atmosphere/atmosphere';
import { gravityTypeHigh } from '../../galaxy/gravity/gravity';
import { skillTypeNormal, skillTypeVeryHigh } from '../../galaxy/skill/skill';
import Species from '../../galaxy/species/species';
import { temperatureTypeCold } from '../../galaxy/temperature/temperature';

const DataSpeciesScientist = Species({
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
  reproduction: skillTypeNormal,
  research: skillTypeVeryHigh,
  relations: {},
});

export default DataSpeciesScientist;
