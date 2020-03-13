import './SelectGalaxy.scss';

import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import {
  galaxyDensities,
  galaxyDensityVeryDense,
  galaxyDensityVerySparse,
  galaxySpeciesCountMaximum,
  galaxySpeciesCountMinimum,
} from '../../../../data/galaxy/galaxy';
import Galaxy from '../../../galaxy/Galaxy';
import { useGalaxy } from '../../../galaxy/GalaxyContext';
import { gameLocationGalaxy } from '../../../Game.const';
import { useGame } from '../../../GameContext';
import StartLayout from '../start-layout/StartLayout';
import { startLocationSetupSpecies } from '../Start.const';
import { useStart } from '../StartContext';
import SelectControl from './select-control/SelectControl';
import { TSelectGalaxy } from './SelectGalaxy.types';
import { densityLabel } from './SelectGalaxy.utils';

const SelectGalaxy: React.FC<TSelectGalaxy> = () => {
  const { galaxy, generate } = useGalaxy();
  const { setView } = useStart();
  const { setView: setGameView } = useGame();
  const species = Array.from(
    {
      length: galaxySpeciesCountMaximum - galaxySpeciesCountMinimum + 1,
    },
    (v, i) => i + 2
  );
  const densities = [...galaxyDensities].reverse();

  return (
    <StartLayout
      back={(): void => setView(startLocationSetupSpecies)}
      forward={(): void => setGameView(gameLocationGalaxy)}
    >
      <div className='select_galaxy'>
        <div className='galaxy_name'>{galaxy.name}</div>
        <div className='galaxy_canvas'>
          <Galaxy />
        </div>
        <div className='galaxy_controls'>
          <div className='controls_cell'>
            galaxy density{' '}
            <SelectControl
              value={galaxy.density}
              values={densities}
              max={galaxyDensityVeryDense}
              min={galaxyDensityVerySparse}
              label={densityLabel(galaxy.density)}
              update={(density): void => generate({ density })}
            />
          </div>
          <div className='controls_cell'>
            species count{' '}
            <SelectControl
              value={galaxy.speciesCount}
              values={species}
              min={galaxySpeciesCountMinimum}
              max={galaxySpeciesCountMaximum}
              label={galaxy.speciesCount.toString()}
              update={(speciesCount): void => generate({ speciesCount })}
            />
          </div>
          <div className='controls_cell'>
            <div>generate</div>
            <div className='new_galaxy' onClick={(): void => generate()}>
              <FontAwesomeIcon icon={faSyncAlt} /> new galaxy
            </div>
          </div>
        </div>
      </div>
    </StartLayout>
  );
};

export default SelectGalaxy;
