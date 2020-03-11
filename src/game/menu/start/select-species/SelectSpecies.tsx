import './SelectSpecies.scss';

import React from 'react';

import { speciesBuilder } from '../../../../data/species/builder';
import { speciesHuman } from '../../../../data/species/human';
import { speciesNomad } from '../../../../data/species/nomad';
import { speciesPopulation } from '../../../../data/species/population';
import { speciesScientist } from '../../../../data/species/scientist';
import { speciesSpy } from '../../../../data/species/spy';
import { TSpecies } from '../../../galaxy/species/Species.types';
import StartLayout from '../start-layout/StartLayout';
import { TSelectSpecies } from './SelectSpecies.types';
import SpeciesDetails from './species-details/SpeciesDetails';
import SpeciesList from './species-list/SpeciesList';

const predefinedSpecies = [
  speciesHuman,
  speciesBuilder,
  speciesNomad,
  speciesPopulation,
  speciesScientist,
  speciesSpy,
];

const SelectSpecies: React.FC<TSelectSpecies> = ({
  setView,
  forward,
  galaxyData: galaxyData,
  setGalaxyData: setgalaxyData,
}) => {
  const selectSpecies = (player: TSpecies): void =>
    setgalaxyData({ ...galaxyData, player });
  return (
    <StartLayout setView={setView} forward={forward}>
      <div className='select_species'>
        <SpeciesList
          selection={galaxyData.player}
          species={predefinedSpecies}
          selectSpecies={selectSpecies}
        />
        <SpeciesDetails {...galaxyData.player} />
      </div>
    </StartLayout>
  );
};

export default SelectSpecies;
