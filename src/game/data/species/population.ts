import { gravityTypeNormal } from '../../galaxy/gravity/gravity';
import { skillTypeVeryHigh, skillTypeVeryLow } from '../../galaxy/skill/skill';
import Species from '../../galaxy/species/species';

const DataSpeciesPopulation = new Species({
  id: `population`,
  name: `population`,
  description: `population`,
  color: `cyan`,
  flag: ``,
  gravitation: [gravityTypeNormal],
  defyGravity: false,
  atmosphere: [],
  anaerobic: true,
  temperature: [],
  ignoreTemperature: true,
  construction: skillTypeVeryLow,
  espionage: skillTypeVeryLow,
  fleet: skillTypeVeryLow,
  population: skillTypeVeryHigh,
  research: skillTypeVeryLow,
  relations: {},
});

export default DataSpeciesPopulation;
