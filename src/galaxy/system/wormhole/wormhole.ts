import ID from '../../../util/id';

/** wormhole description */
export type TWormhole = {
  /** wormhole id */
  id: string;
};

/** wormhole options */
export type TWormholeOptions = Partial<TWormhole> | Wormhole;

/** wormhole data */
export default class Wormhole implements TWormhole {
  id: string;

  constructor(options?: TWormholeOptions) {
    this.id = options?.id ?? ID();
  }
}
