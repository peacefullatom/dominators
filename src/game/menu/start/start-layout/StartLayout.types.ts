import { TComponent } from '../../../../types';

export type TStartLayout = {
  back?: () => void;
  forward?: () => void;
} & TComponent;
