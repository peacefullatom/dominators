import { TComponent } from '../../../types';

export type TStart = {
  startView?: string;
  setGameView: (view: string) => void;
} & TComponent;
