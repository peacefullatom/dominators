import ID from '../../../util/id';
import { governorDefaultSkillLevel } from './governor.const';
import { TGovernor } from './governor.types';

const Governor = (): TGovernor => ({
  id: ID(),
  avatar: '',
  construction: governorDefaultSkillLevel,
  espionage: governorDefaultSkillLevel,
  fleet: governorDefaultSkillLevel,
  research: governorDefaultSkillLevel,
});

export default Governor;
