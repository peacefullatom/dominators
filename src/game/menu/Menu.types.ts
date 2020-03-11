import { TGalaxyData } from '../galaxy/Galaxy.types';

export type TMenu = {
  galaxyData: TGalaxyData;
  setGalaxyData: (data: TGalaxyData) => void;
  menuView?: string;
  setGameView: (view: string) => void;
};
