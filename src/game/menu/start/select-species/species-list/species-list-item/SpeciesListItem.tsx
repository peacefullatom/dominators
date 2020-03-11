import './SpeciesListItem.scss';

import React from 'react';

import { TSpeciesListItem } from './SpeciesListItem.types';

const SpeciesListItem: React.FC<TSpeciesListItem> = ({
  selected,
  species,
  selectSpecies,
}) => {
  return (
    <div
      className={`species_list_item ${selected ? 'selected' : ''}`}
      onClick={(): void => selectSpecies(species)}
    >
      {species.name}
    </div>
  );
};

export default SpeciesListItem;
