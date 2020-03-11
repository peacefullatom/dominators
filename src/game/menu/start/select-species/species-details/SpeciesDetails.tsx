import './SpeciesDetails.scss';

import React from 'react';

import { TSpeciesDetails } from './SpeciesDetails.types';

const SpeciesDetails: React.FC<TSpeciesDetails> = props => {
  return (
    <div className='species_details'>
      <div className='details_left'>
        <div className='left_avatar'></div>
      </div>
      <div className='details_right'>
        <div className='right_name'>{props.name}</div>
        <div className='right_description'>{props.description}</div>
      </div>
    </div>
  );
};

export default SpeciesDetails;
