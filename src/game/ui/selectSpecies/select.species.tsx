import './select.species.scss';

import React from 'react';

import DataSpeciesBuilder from '../../data/species/builder';
import DataSpeciesHuman from '../../data/species/human';
import DataSpeciesNomad from '../../data/species/nomad';
import DataSpeciesPopulation from '../../data/species/population';
import DataSpeciesScientist from '../../data/species/scientist';
import DataSpeciesSpy from '../../data/species/spy';
import { TSpecies } from '../../galaxy/species/species';
import UiStartView, { TUiStartView } from '../common/start.view';

type TUiSpeciesList = {
  select: (species: TSpecies) => void;
};

const UiSpeciesList: React.FC<TUiSpeciesList> = ({ select }) => {
  const list = [
    DataSpeciesHuman,
    DataSpeciesBuilder,
    DataSpeciesNomad,
    DataSpeciesPopulation,
    DataSpeciesScientist,
    DataSpeciesSpy,
  ];

  return (
    <div className='list'>
      {list.map((s, i) => (
        <div
          key={i}
          className='item'
          style={{ background: s.color }}
          onClick={(): void => select(s)}
        >
          <div className='label'>{s.name}</div>
        </div>
      ))}
    </div>
  );
};

type TUiDisplaySpecies = {
  species: TSpecies;
};

const UiDisplaySpecies: React.FC<TUiDisplaySpecies> = ({ species }) => {
  return (
    <div className='species'>
      <div className='avatar' style={{ background: species.color }}></div>
      <div className='data'>
        <div className='name'>{species.name}</div>
        <div className='description'>{species.description}</div>
      </div>
    </div>
  );
};

type TUiSelectSpecies = {
  species?: TSpecies;
  setSpecies: (s: TSpecies) => void;
} & TUiStartView;

const UiSelectSpecies: React.FC<TUiSelectSpecies> = ({
  species,
  setSpecies,
  home,
  back,
  next,
  nextDisabled,
}) => {
  const props: TUiStartView = {
    className: 'select species',
    label: 'Select species',
    home,
    back,
    next,
    nextDisabled,
  };
  return (
    <UiStartView {...props}>
      <UiSpeciesList select={(s): void => setSpecies(s)}></UiSpeciesList>
      {species && <UiDisplaySpecies species={species}></UiDisplaySpecies>}
    </UiStartView>
  );
};

export default UiSelectSpecies;
