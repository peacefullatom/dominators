import './SpeciesListItem.scss';

import React from 'react';

import { useGalaxy } from '../../../../../galaxy/GalaxyContext';
import { TSpeciesListItem } from './SpeciesListItem.types';

const SpeciesListItem: React.FC<TSpeciesListItem> = ({ selected, species }) => {
  const { galaxy, setGalaxy } = useGalaxy();
  return (
    <div
      className={`species_list_item ${selected ? 'selected' : ''}`}
      onClick={(): void => setGalaxy({ ...galaxy, player: species })}
    >
      {species.name}
    </div>
  );
};

export default SpeciesListItem;
