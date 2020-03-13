import { TMultiSelect } from './multi-select/MultiSelect.types';

export type TSetupSpecies = {};

export type TMultiSelectResult = {
  gravitation?: Partial<TMultiSelect>;
  atmosphere?: Partial<TMultiSelect>;
  temperature?: Partial<TMultiSelect>;
};
