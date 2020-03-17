import { TPlanet } from './planet/Planet.types';
import { TSystemWormhole } from './System.types';

export type TSystemCanvas = {
  width: number;
  height: number;
  planets: TPlanet[];
  wormholes: TSystemWormhole[];
};
