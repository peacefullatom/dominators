import ID from '../../util/id';
import Atmosphere from '../atmosphere/atmosphere';
import Temperature from '../temperature/temperature';

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
