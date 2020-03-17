import { TPoint } from '../../../types';
import { TSpecies } from '../species/Species.types';
import { TGovernor } from './governor/Governor.types';
import { TPlanet } from './planet/Planet.types';
import { TStar } from './star/Star.types';

export type TSystemSpecies = {
  data: TSpecies;
  governor: TGovernor;
  discovered: boolean;
  canObserve: boolean;
  isHabitant: boolean;
  homeSystem: boolean;
};

export type TSystemCoordinates = {
  shape?: number;
  status?: number;
  active?: boolean;
} & TPoint;

export type TSystem = {
  id: string;
  name: string;
  populated: boolean;
  star: TStar;
  planets: TPlanet[];
  wormholes: string[];
  species: TSystemSpecies[];
  coordinates: TSystemCoordinates;
};
