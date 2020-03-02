import { gravityTypeNormal } from '../../galaxy/gravity/gravity';
import { skillTypeNormal, skillTypeVeryHigh } from '../../galaxy/skill/skill';
import Species from '../../galaxy/species/species';

const DataSpeciesPopulation = Species({
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
  construction: skillTypeNormal,
  espionage: skillTypeNormal,
  fleet: skillTypeNormal,
  reproduction: skillTypeVeryHigh,
  research: skillTypeNormal,
  relations: {},
});

export default DataSpeciesPopulation;
