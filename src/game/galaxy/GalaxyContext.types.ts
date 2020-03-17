import { TGalaxyData } from './Galaxy.types';
import { TSystem } from './system/System.types';

export type TGalaxyContextGenerate = {
  density?: number;
  speciesCount?: number;
};

export type TGalaxyContext = {
  galaxy: TGalaxyData;
  setGalaxy: (data: TGalaxyData) => void;
  system?: TSystem;
  setSystem: (system: TSystem) => void;
  reset: () => void;
  generate: (data?: TGalaxyContextGenerate) => void;
  cycle: () => void;
};
