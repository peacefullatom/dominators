import { TPoint } from '../../../types';
import { TPlanet } from './planet/Planet.types';

export type TSystem = {
  id: string;
  name: string;
  populated: boolean;
  planets: TPlanet[];
  coordinates: TPoint;
};
