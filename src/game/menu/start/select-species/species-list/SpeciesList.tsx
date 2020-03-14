import './SpeciesList.scss';

import React, { useEffect } from 'react';

import { useGalaxy } from '../../../../galaxy/GalaxyContext';
import { TSpecies } from '../../../../galaxy/species/Species.types';
import SpeciesListItem from './species-list-item/SpeciesListItem';
import { TSpeciesList } from './SpeciesList.types';

const SpeciesList: React.FC<TSpeciesList> = ({ selection, species }) => {
  const { galaxy, setGalaxy } = useGalaxy();
  const select = (selection: Partial<TSpecies>): void => {
    setGalaxy({
      ...galaxy,
      player: { ...(selection as TSpecies), player: true },
    });
  };
  const keyboard = (event: KeyboardEvent): void => {
    const { keyCode } = event;
    // 1
    if (keyCode === 49 || keyCode === 97) {
      select(species[0]);
    }
    // 2
    if (keyCode === 50 || keyCode === 98) {
      select(species[1]);
    }
    // 3
    if (keyCode === 51 || keyCode === 99) {
      select(species[2]);
    }
    // 4
    if (keyCode === 52 || keyCode === 100) {
      select(species[3]);
    }
    // 5
    if (keyCode === 53 || keyCode === 101) {
      select(species[4]);
    }
    // 6
    if (keyCode === 54 || keyCode === 102) {
      select(species[5]);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyboard);

    return (): void => document.removeEventListener('keydown', keyboard);
  });
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
