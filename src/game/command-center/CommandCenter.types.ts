import { TComponent } from '../../types';
import { TGalaxyData } from '../galaxy/Galaxy.types';

export type TCommandCenter = {
  galaxyData: TGalaxyData;
  setGalaxyData: (data: TGalaxyData) => void;
  gameView?: string;
} & TComponent;
