import { atmosphereTypeNitrogenOxygen } from '../../galaxy/atmosphere/atmosphere';
import { gravityTypeNormal } from '../../galaxy/gravity/gravity';
import { skillTypeNormal } from '../../galaxy/skill/skill';
import Species from '../../galaxy/species/species';
import { temperatureTypeNeutral } from '../../galaxy/temperature/temperature';

const DataSpeciesHuman = new Species({
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
});

export default DataSpeciesHuman;
