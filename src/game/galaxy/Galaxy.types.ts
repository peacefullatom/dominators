import { TComponent, TPoint } from '../../types';
import { TSpecies } from './species/Species.types';
import { TSystem } from './system/System.const';

export type TGalaxyData = {
  id: string;
  name: string;
  density: number;
  seed: TPoint[];
  speciesCount: number;
  player: TSpecies;
  species: TSpecies[];
  systems: TSystem[];
};

export type TGalaxy = {
  data: TGalaxyData;
} & TComponent;
