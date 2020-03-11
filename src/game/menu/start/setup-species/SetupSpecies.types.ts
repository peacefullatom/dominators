import { TComponent } from '../../../../types';
import { TStartLayout } from '../start-layout/StartLayout.types';
import { TStartScreen } from '../Start.types';
import { TMultiSelect } from './multi-select/MultiSelect.types';

export type TSetupSpecies = {} & TStartScreen & TStartLayout & TComponent;

export type TMultiSelectResult = {
  gravitation?: Partial<TMultiSelect>;
  atmosphere?: Partial<TMultiSelect>;
  temperature?: Partial<TMultiSelect>;
};
