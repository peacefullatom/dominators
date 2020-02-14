import { TGovernor } from './governor/governor.types';
import { TPlanet } from './planet/planet.types';
import { TPortal } from './portal/portal.types';
import { TStar } from './star/star.types';

/** planetary system description */
export type TPlanetarySystem = {
  /** id of the planetary system */
  id: string;
  /** name of the planetary system */
  name: string;
  /** governor of the planetary system */
  governor: TGovernor;
  /** star of the planetary system */
  star: TStar;
  /** list of planets */
  planets: TPlanet[];
  /** list of portals */
  portals: TPortal[];
};
