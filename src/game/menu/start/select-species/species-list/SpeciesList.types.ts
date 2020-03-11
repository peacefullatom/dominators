import { TSpecies } from '../../../../galaxy/species/Species.types';

export type TSpeciesList = {
  selection: TSpecies;
  species: Partial<TSpecies>[];
  selectSpecies: (species: TSpecies) => void;
};
