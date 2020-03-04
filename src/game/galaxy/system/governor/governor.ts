/** minimum/default skill level */
import ID from '../../../../util/id';

/** maximum skill level */
export const governorSkillLevelDefault = 0.02;
export const governorSkillLevelMaximum = 0.25;

/** avatar, normalized skill level */
type TGovernorBio = {
  avatar: string;
  skill: number;
};

/** governor description */
export type TGovernor = {
  /** governor id */
  id: string;
  /** governor avatar */
  avatar: string;
  /** construction skill level in range from 0.02 to 0.25 */
  construction: number;
  /** espionage skill level in range from 0.02 to 0.25 */
  espionage: number;
  /** fleet skill level in range from 0.02 to 0.25 */
  fleet: number;
  /** population skill level in range from 0.02 to 0.25 */
  population: number;
  /** research skill level in range from 0.02 to 0.25 */
  research: number;
};

export type TGovernorOptions = Partial<TGovernor> | Governor;

export default class Governor implements TGovernor {
  id: string;
  avatar: string;
  construction: number;
  espionage: number;
  fleet: number;
  population: number;
  research: number;

  constructor(options?: TGovernorOptions) {
    this.id = options?.id ?? ID();
    this.avatar = options?.avatar ?? ``;
    this.construction = options?.construction ?? governorSkillLevelDefault;
    this.espionage = options?.espionage ?? governorSkillLevelDefault;
    this.fleet = options?.fleet ?? governorSkillLevelDefault;
    this.population = options?.population ?? governorSkillLevelDefault;
    this.research = options?.research ?? governorSkillLevelDefault;
  }

  readableSkill(skill: number): number {
    return Math.floor(skill * 100);
  }

  bio(skill: number): TGovernorBio {
    return { avatar: this.avatar, skill: this.readableSkill(skill) };
  }

  bioConstruction(): TGovernorBio {
    return this.bio(this.construction);
  }

  bioEspionage(): TGovernorBio {
    return this.bio(this.espionage);
  }

  bioFleet(): TGovernorBio {
    return this.bio(this.fleet);
  }

  bioPopulation(): TGovernorBio {
    return this.bio(this.population);
  }

  bioResearch(): TGovernorBio {
    return this.bio(this.research);
  }
}
