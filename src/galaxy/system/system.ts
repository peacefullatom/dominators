import GenerateEntities from '../../util/generateEntities';
import ID from '../../util/id';
import RandomNumber from '../../util/randomNumber';
import Governor from './governor/governor';
import Planet from './planet/planet';
import Wormhole from './wormhole/wormhole';

/** system description */
export type TSystem = {
  /** system id */
  id: string;
  /** specifies if system is populated */
  populated: boolean;
  /** governor of the system */
  governor: Governor;
  /** number of planets */
  planetsCount: number;
  /** planets list */
  planets: Planet[];
  /** number of wormholes */
  wormholesCount: number;
  /** wormholes list */
  wormholes: Wormhole[];
};

/** system options */
export type TSystemOptions = Partial<TSystem> | System;

/** system data */
export default class System implements TSystem {
  id: string;
  populated: boolean;
  governor: Governor;
  planetsCount: number;
  planets: Planet[];
  wormholesCount: number;
  wormholes: Wormhole[];

  constructor(options?: TSystemOptions) {
    this.id = options?.id ?? ID();
    this.populated = options?.populated ?? false;
    this.governor = options?.governor ?? new Governor();
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
  }
}
