import './SpeciesList.scss';

import React from 'react';

import { TSpecies } from '../../../../galaxy/species/Species.types';
import SpeciesListItem from './species-list-item/SpeciesListItem';
import { TSpeciesList } from './SpeciesList.types';

const SpeciesList: React.FC<TSpeciesList> = ({ selection, species }) => {
  return (
    <div className='species_list'>
      {species.map((item, index) => (
        <SpeciesListItem
          key={index}
          selected={selection.id === item.id}
          species={item as TSpecies}
        />
      ))}
    </div>
  );
};

export default SpeciesList;
