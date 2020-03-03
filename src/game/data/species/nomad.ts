import { atmosphereTypeNitrogenCarbonDioxide, atmosphereTypeNitrogenOxygen } from '../../galaxy/atmosphere/atmosphere';
import { skillTypeHigh, skillTypeNormal, skillTypeVeryHigh } from '../../galaxy/skill/skill';
import Species from '../../galaxy/species/species';
import { temperatureTypeNeutral } from '../../galaxy/temperature/temperature';

const DataSpeciesNomad = new Species({
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
});

export default DataSpeciesNomad;
