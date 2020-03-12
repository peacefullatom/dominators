import { TPoint } from '../../../types';
import { TPlanet } from './planet/Planet.types';

export type TSystem = {
  id: string;
  name: string;
  planets: TPlanet[];
  coordinates: TPoint;
};
