import { TComponent } from '../../../types';
import { TGalaxyData } from '../../galaxy/Galaxy.types';

export type TStart = {
  view?: string;
  galaxyData: TGalaxyData;
  setGalaxyData: (data: TGalaxyData) => void;
  setGameView: (view: string) => void;
} & TComponent;

export type TStartScreen = {
  galaxyData: TGalaxyData;
  setGalaxyData: (data: TGalaxyData) => void;
};
