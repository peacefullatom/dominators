/** the star of the planetary system */
export type TStar = {
  /** id of the star */
  id: string;
  /** star name */
  name: string;
  /** class of the star */
  spectralClass: string;
  /** star radius */
  radius: number;
  /** habitable zone, a.e. */
  habitableZone: number;
};
