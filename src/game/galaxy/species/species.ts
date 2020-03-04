import ID from '../../../util/id';
import { atmosphereTypeNitrogenOxygen } from '../atmosphere/atmosphere';
import { gravityTypeNormal } from '../gravity/gravity';
import { skillTypeNormal } from '../skill/skill';
import Governor from '../system/governor/governor';
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

// species skills: construction, espionage, fleet, population, research
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
  /** governor used to modify an overall construction points */
  leadOfConstruction?: Governor;
  /** espionage skill modifier */
  espionage: number;
  /** governor used to modify an overall espionage points */
  leadOfEspionage?: Governor;
  /** fleet command skill modifier */
  fleet: number;
  /** governor used to modify an overall fleet points */
  leadOfFleet?: Governor;
  /** population skill modifier */
  population: number;
  /** governor used to modify an overall population points */
  leadOfPopulation?: Governor;
  /** research skill modifier */
  research: number;
  /** governor used to modify an overall research points */
  leadOfResearch?: Governor;
  /** relations with other species */
  relations: TSpeciesRelations;
  /** player's species */
  player: boolean;
};

/** species options */
export type TSpeciesOptions = Partial<TSpecies> | TSpecies;

/** species data */
export default class Species implements TSpecies {
  id: string;
  name: string;
  description: string;
  color: string;
  flag: string;
  gravitation: number[];
  defyGravity: boolean;
  atmosphere: number[];
  anaerobic: boolean;
  temperature: number[];
  ignoreTemperature: boolean;
  construction: number;
  leadOfConstruction?: Governor;
  espionage: number;
  leadOfEspionage?: Governor;
  fleet: number;
  leadOfFleet?: Governor;
  population: number;
  leadOfPopulation?: Governor;
  research: number;
  leadOfResearch?: Governor;
  relations: TSpeciesRelations;
  player: boolean;

  constructor(options?: TSpeciesOptions) {
    this.id = options?.id ?? ID();
    this.name = options?.name ?? ``;
    this.description = options?.description ?? ``;
    this.color = options?.color ?? ``;
    this.flag = options?.flag ?? ``;
    this.gravitation = options?.gravitation ?? [gravityTypeNormal];
    this.defyGravity = options?.defyGravity ?? false;
    this.atmosphere = options?.atmosphere ?? [atmosphereTypeNitrogenOxygen];
    this.anaerobic = options?.anaerobic ?? false;
    this.temperature = options?.temperature ?? [temperatureTypeNeutral];
    this.ignoreTemperature = options?.ignoreTemperature ?? false;
    this.construction = options?.construction ?? skillTypeNormal;
    this.leadOfConstruction = options?.leadOfConstruction;
    this.espionage = options?.espionage ?? skillTypeNormal;
    this.leadOfEspionage = options?.leadOfEspionage;
    this.fleet = options?.fleet ?? skillTypeNormal;
    this.leadOfFleet = options?.leadOfFleet;
    this.population = options?.population ?? skillTypeNormal;
    this.leadOfPopulation = options?.leadOfPopulation;
    this.research = options?.research ?? skillTypeNormal;
    this.leadOfResearch = options?.leadOfResearch;
    this.relations = options?.relations ?? {};
    this.player = options?.player ?? false;
  }
}
