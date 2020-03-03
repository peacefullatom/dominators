import { atmosphereTypeHydrogenHelium, atmosphereTypeNitrogenOxygen } from '../../galaxy/atmosphere/atmosphere';
import { gravityTypeLow } from '../../galaxy/gravity/gravity';
import { skillTypeNormal, skillTypeVeryHigh } from '../../galaxy/skill/skill';
import Species from '../../galaxy/species/species';
import { temperatureTypeNeutral } from '../../galaxy/temperature/temperature';

const DataSpeciesBuilder = new Species({
  id: `builder`,
  name: `builder`,
  description: `builder`,
  color: `green`,
  flag: ``,
  gravitation: [gravityTypeLow],
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
  relations: {},
});

export default DataSpeciesBuilder;
