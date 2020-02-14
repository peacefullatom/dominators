import { starClass } from './star.const';

/** the star of the planetary system */
export type TStar = {
  /** id of the star */
  id: string;
  /** class of the star */
  class: starClass;
  /**
   * - star radius
   * - values are stored in the _starRadius_ enum
   */
  radius: number;
  /**
   * - habitable zone, a.e.
   * - values are stored in the _starHabitableZone_ enum
   */
  habitableZone: number;
};
