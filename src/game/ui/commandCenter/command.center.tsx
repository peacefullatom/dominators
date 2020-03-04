import './command.center.scss';

import React from 'react';

import { TAction } from '../../../types';
import RandomValue from '../../../util/randomValue';
import DataSpeciesBuilder from '../../data/species/builder';
import DataSpeciesHuman from '../../data/species/human';
import DataSpeciesNomad from '../../data/species/nomad';
import DataSpeciesPopulation from '../../data/species/population';
import DataSpeciesScientist from '../../data/species/scientist';
import DataSpeciesSpy from '../../data/species/spy';
import { TSpecies } from '../../galaxy/species/species';
import UiGameLayout, { TUiGameLayout } from '../common/game.layout';
import { uiLocationEspionage, uiLocationFleet, uiLocationPlanets, uiLocationResearch, uiLocationStats } from '../ui.const';

const colors = ['red', 'green', 'blue', 'cyan', 'magenta', 'yellow'].sort(() =>
  Math.random() >= 0.5 ? -1 : 1
);

/** command center description */
type TUiCommandCenter = {
  /** user selected species */
  species: TSpecies;
  fleet: TAction;
  research: TAction;
  espionage: TAction;
  planets: TAction;
  stats: TAction;
} & TUiGameLayout;

const UiCommandCenter: React.FC<TUiCommandCenter> = ({
  galaxy,
  species,
  action,
  fleet,
  research,
  espionage,
  planets,
  stats,
}) => {
  const parent = React.useRef<HTMLDivElement>(null);

  if (!galaxy.populated) {
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
  }

  React.useEffect(() => {
    const container = parent.current;
    if (container) {
      galaxy.embed(container, { systems: true, wormholes: true }, true);
    }
  }, [parent]);

  const locations = [
    {
      label: uiLocationFleet,
      action: (): void => fleet(),
    },
    {
      label: uiLocationResearch,
      action: (): void => research(),
    },
    {
      label: uiLocationEspionage,
      action: (): void => espionage(),
    },
    {
      label: uiLocationPlanets,
      action: (): void => planets(),
    },
    {
      label: uiLocationStats,
      action: (): void => stats(),
    },
  ];

  return (
    <UiGameLayout galaxy={galaxy} action={action} actionName={'menu'}>
      <div className='command center'>
        <div ref={parent} className='galaxy'></div>
        <div className='navigation'>
          {locations.map((l, i) => (
            <button key={i} className='item' onClick={l.action}>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </UiGameLayout>
  );
};

export default UiCommandCenter;
