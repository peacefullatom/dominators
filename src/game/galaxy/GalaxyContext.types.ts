import { TGalaxyData } from './Galaxy.types';

export type TGalaxyContextGenerate = {
  density?: number;
  speciesCount?: number;
};

export type TGalaxyContext = {
  galaxy: TGalaxyData;
  setGalaxy: (data: TGalaxyData) => void;
  reset: () => void;
  generate: (data?: TGalaxyContextGenerate) => void;
  cycle: () => void;
};
