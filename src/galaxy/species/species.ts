import ID from '../../util/id';
import Atmosphere from '../atmosphere/atmosphere';
import Temperature from '../temperature/temperature';

export type TSpeciesCommonActivities = {
  trade: boolean;
  routeSharing: boolean;
  research: boolean;
};

export const speciesRelationsTypeNeutral = 0;
export const speciesRelationsTypeAllies = 1;
export const speciesRelationsTypeWar = 2;

export type TSpeciesRelationsType =
  | typeof speciesRelationsTypeNeutral
  | typeof speciesRelationsTypeAllies
  | typeof speciesRelationsTypeWar;

export type TSpeciesRelations = {
  [speciesId: string]: {
    relations: TSpeciesRelationsType;
    activities: TSpeciesCommonActivities;
  };
};

/** species description */
export type TSpecies = {
  /** species id */
  id: string;
  /** species name */
  name: string;
  /** species flag */
  flag: string;
  /** species atmosphere */
  atmosphere: Atmosphere;
  /** species temperature */
  temperature: Temperature;
  /** relations with other species */
  relations: TSpeciesRelations;
};

/** species options */
export type TSpeciesOptions = Partial<TSpecies> | Species;

/** species data */
export default class Species implements TSpecies {
  id: string;
  name: string;
  flag: string;
  atmosphere: Atmosphere;
  temperature: Temperature;
  relations: TSpeciesRelations;

  constructor(options?: TSpeciesOptions) {
    this.id = options?.id ?? ID();
    this.name = options?.name ?? ``;
    this.flag = options?.flag ?? ``;
    this.atmosphere = new Atmosphere(options?.atmosphere);
    this.temperature = new Temperature(options?.temperature);
    this.relations = options?.relations ?? {};
  }
}
