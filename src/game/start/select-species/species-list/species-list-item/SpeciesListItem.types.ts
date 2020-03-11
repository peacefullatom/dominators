import { TSpecies } from '../../../../galaxy/species/Species.types';

export type TSpeciesListItem = {
  selected: boolean;
  species: TSpecies;
  selectSpecies: (species: TSpecies) => void;
};
