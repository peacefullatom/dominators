import { TMultiSelect } from './multi-select/MultiSelect.types';

export type TSetupSpecies = {};

export type TMultiSelectResult = {
  gravity?: Partial<TMultiSelect>;
  atmosphere?: Partial<TMultiSelect>;
  temperature?: Partial<TMultiSelect>;
};
