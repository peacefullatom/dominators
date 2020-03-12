import { TComponent } from '../../../../types';
import { TStartLayout } from '../start-layout/StartLayout.types';
import { TMultiSelect } from './multi-select/MultiSelect.types';

export type TSetupSpecies = {} & TStartLayout & TComponent;

export type TMultiSelectResult = {
  gravitation?: Partial<TMultiSelect>;
  atmosphere?: Partial<TMultiSelect>;
  temperature?: Partial<TMultiSelect>;
};
