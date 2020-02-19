import GenerateEntities from '../../util/generateEntities';
import ID from '../../util/id';
import RandomNumber from '../../util/randomNumber';
import RandomValue from '../../util/randomValue';
import Species from '../species/species';
import Governor from './governor/governor';
import Planet from './planet/planet';
import Wormhole from './wormhole/wormhole';

/** species options description */
export type TSystemSpecies = {
  /** species id */
  [speciesId: string]: {
    /** governor of the species */
    governor: Governor;
    /** species discovered system */
    discovered: boolean;
    /** species can observe system */
    observable: boolean;
    /** species populated system */
    populated: boolean;
    /** home system */
    homeSystem: boolean;
  };
};

/** system description */
export type TSystem = {
  /** system id */
  id: string;
  /** specifies if system is populated */
  populated: boolean;
  /** number of planets */
  planetsCount: number;
  /** planets list */
  planets: Planet[];
  /** number of wormholes */
  wormholesCount: number;
  /** wormholes list */
  wormholes: Wormhole[];
  /** species options */
  species: TSystemSpecies;
};

/** system options */
export type TSystemOptions = Partial<TSystem> | System;

/** system data */
export default class System implements TSystem {
  id: string;
  populated: boolean;
  planetsCount: number;
  planets: Planet[];
  wormholesCount: number;
  wormholes: Wormhole[];
  species: TSystemSpecies;

  constructor(options?: TSystemOptions) {
    this.id = options?.id ?? ID();
    this.populated = options?.populated ?? false;
    this.planetsCount = options?.planetsCount ?? RandomNumber(7, 2);
    this.planets = GenerateEntities(
      Planet,
      this.planetsCount,
      options?.planets
    );
    this.wormholesCount = options?.wormholesCount ?? RandomNumber(4, 1);
    this.wormholes = GenerateEntities(
      Wormhole,
      this.wormholesCount,
      options?.wormholes
    );
    this.species = options?.species ?? {};
    this.setup();
  }

  /** setup system after creation */
  setup(): void {
    this.populated = Object.keys(this.species)
      .map(key => this.species[key].populated)
      .some(value => value);
  }

  /** populate system at the start */
  populate(species: Species): void {
    const planet = RandomValue(this.planets);
    planet.populate(species);
    this.populated = true;
    this.species[species.id] = {
      discovered: true,
      governor: new Governor(),
      homeSystem: true,
      observable: true,
      populated: true,
    };
  }

  /** user colonizes system */
  colonize(): void {}
}
