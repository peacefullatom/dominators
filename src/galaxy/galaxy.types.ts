import { TPlanetarySystem } from './planetarySystem/planetarySystem.types';
import { TSpecies } from './species/species.types';

/** galaxy structure description */
export type TGalaxy = {
  /** id of the galaxy */
  id: string;
  /** name of the galaxy */
  name: string;
  /** list of the planetary systems */
  planetarySystems: TPlanetarySystem[];
  /** list of the species */
  species: TSpecies[];
};
