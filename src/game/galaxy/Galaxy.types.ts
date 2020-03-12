import { TPoint } from '../../types';
import { TSpecies } from './species/Species.types';
import { TSystem } from './system/System.types';

export type TGalaxyGenerate = {
  seed: TPoint[];
  systems: TSystem[];
};

export type TGalaxyData = {
  id: string;
  name: string;
  density: number;
  seed: TPoint[];
  systems: TSystem[];
  speciesCount: number;
  player: TSpecies;
  species: TSpecies[];
};

export type TGalaxy = {
  galaxy: TGalaxyData;
  setGalaxy: (data: TGalaxyData) => void;
};
