import './command.center.scss';

import React from 'react';

import RandomValue from '../../../util/randomValue';
import DataSpeciesBuilder from '../../data/species/builder';
import DataSpeciesHuman from '../../data/species/human';
import DataSpeciesNomad from '../../data/species/nomad';
import DataSpeciesPopulation from '../../data/species/population';
import DataSpeciesScientist from '../../data/species/scientist';
import DataSpeciesSpy from '../../data/species/spy';
import Galaxy from '../../galaxy/galaxy';
import { TSpecies } from '../../galaxy/species/species';
import { uiLocationEspionage, uiLocationFleet, uiLocationPlanets, uiLocationResearch, uiLocationStats } from '../ui.const';

const colors = ['red', 'green', 'blue', 'cyan', 'magenta', 'yellow'].sort(() =>
  Math.random() >= 0.5 ? -1 : 1
);

/** command center description */
type TUiCommandCenter = {
  /** galaxy data */
  galaxy: Galaxy;
  /** user selected species */
  species: TSpecies;
};

const UiCommandCenter: React.FC<TUiCommandCenter> = ({ galaxy, species }) => {
  const parent = React.useRef<HTMLDivElement>(null);

  galaxy.species = Array.from({ length: galaxy.speciesCount - 1 }, () =>
    RandomValue([
      DataSpeciesBuilder,
      DataSpeciesHuman,
      DataSpeciesNomad,
      DataSpeciesPopulation,
      DataSpeciesScientist,
      DataSpeciesSpy,
    ])
  )
    .concat({ ...species, player: true })
    .map((s, i) => ({ ...s, color: colors[i] }));

  galaxy.populate(galaxy.species);

  React.useEffect(() => {
    const container = parent.current;
    if (container) {
      galaxy.embed(container);
    }
  }, [parent]);

  const locations = [
    uiLocationFleet,
    uiLocationResearch,
    uiLocationEspionage,
    uiLocationPlanets,
    uiLocationStats,
  ];

  return (
    <div className='command center'>
      <div className='header'>
        <button className='menu'>menu</button>
        <div className='feed'>feed</div>
        <button className='expand'>news</button>
        <button className='pause'>pause</button>
      </div>
      <div ref={parent} className='galaxy'></div>
      <div className='navigation'>
        {locations.map((l, i) => (
          <button key={i} className='item'>
            {l}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UiCommandCenter;
