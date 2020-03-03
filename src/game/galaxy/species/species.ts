import ID from '../../../util/id';
import { atmosphereTypeNitrogenOxygen } from '../atmosphere/atmosphere';
import { gravityTypeNormal } from '../gravity/gravity';
import { skillTypeNormal } from '../skill/skill';
import { temperatureTypeNeutral } from '../temperature/temperature';

/** activities shared by species */
export type TSpeciesCommonActivities = {
  /** trading affects construction points generation per cycle */
  trade: boolean;
  /** route sharing allows to get random information about routes known to other species */
  routeSharing: boolean;
  /** research affects research points generation per cycle */
  research: boolean;
};

/** initial relations */
export const speciesRelationsTypeNeutral = 0;
/** is species are allied they can share their activities */
export const speciesRelationsTypeAllies = 1;
/** these relations will end by extinction */
export const speciesRelationsTypeWar = 2;

/** species relations union type */
export type TSpeciesRelationsType =
  | typeof speciesRelationsTypeNeutral
  | typeof speciesRelationsTypeAllies
  | typeof speciesRelationsTypeWar;

/** species relations description */
export type TSpeciesRelations = {
  [speciesId: string]: {
    /** current relations */
    relations: TSpeciesRelationsType;
    /** common activities */
    activities: TSpeciesCommonActivities;
  };
};

// species skills: construction, espionage, fleet, reproduction, research
// range of values: -1.5, -1.25, 1, 1.25, 1.5
// refer to skill.ts

/** species description */
export type TSpecies = {
  /** species id */
  id: string;
  /** species name */
  name: string;
  /** species description */
  description: string;
  /** species color on a galaxy map */
  color: string;
  /** species flag */
  flag: string;
  /** species preferred gravitation */
  gravitation: number[];
  /** species don't care about gravity */
  defyGravity: boolean;
  /** species atmosphere */
  atmosphere: number[];
  /** species don't require an atmosphere */
  anaerobic: boolean;
  /** species temperature */
  temperature: number[];
  /** species live under ground or in a hard shell */
  ignoreTemperature: boolean;
  /** construction skill modifier */
  construction: number;
  /** espionage skill modifier */
  espionage: number;
  /** fleet command skill modifier */
  fleet: number;
  /** reproduction skill modifier */
  reproduction: number;
  /** research skill modifier */
  research: number;
  /** relations with other species */
  relations: TSpeciesRelations;
  /** player's species */
  player: boolean;
};

/** species options */
export type TSpeciesOptions = Partial<TSpecies> | TSpecies;

/** species data */
const Species = (options?: TSpeciesOptions): TSpecies => ({
  id: options?.id ?? ID(),
  name: options?.name ?? ``,
  description: options?.description ?? ``,
  color: options?.color ?? ``,
  flag: options?.flag ?? ``,
  gravitation: options?.gravitation ?? [gravityTypeNormal],
  defyGravity: options?.defyGravity ?? false,
  atmosphere: options?.atmosphere ?? [atmosphereTypeNitrogenOxygen],
  anaerobic: options?.anaerobic ?? false,
  temperature: options?.temperature ?? [temperatureTypeNeutral],
  ignoreTemperature: options?.ignoreTemperature ?? false,
  construction: options?.construction ?? skillTypeNormal,
  espionage: options?.espionage ?? skillTypeNormal,
  fleet: options?.fleet ?? skillTypeNormal,
  reproduction: options?.reproduction ?? skillTypeNormal,
  research: options?.research ?? skillTypeNormal,
  relations: options?.relations ?? {},
  player: options?.player ?? false,
});

export default Species;
