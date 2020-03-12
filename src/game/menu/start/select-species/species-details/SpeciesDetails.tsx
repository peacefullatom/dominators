import './SpeciesDetails.scss';

import React from 'react';

import { useGalaxy } from '../../../../galaxy/GalaxyContext';
import { TSpeciesDetails } from './SpeciesDetails.types';

const SpeciesDetails: React.FC<TSpeciesDetails> = () => {
  const { galaxy } = useGalaxy();

  return (
    <div className='species_details'>
      <div className='details_left'>
        <div className='left_avatar'></div>
      </div>
      <div className='details_right'>
        <div className='right_name'>{galaxy.player.name}</div>
        <div className='right_description'>{galaxy.player.description}</div>
      </div>
    </div>
  );
};

export default SpeciesDetails;
