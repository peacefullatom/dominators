import './SelectGalaxy.scss';

import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { createRef } from 'react';

import {
  galaxyDensities,
  galaxyDensityVeryDense,
  galaxyDensityVerySparse,
  galaxyNames,
  galaxySpeciesCountMaximum,
  galaxySpeciesCountMinimum,
} from '../../../data/galaxy/galaxy';
import CreateDistributedPoints from '../../../util/poisson';
import RandomValue from '../../../util/randomValue';
import Galaxy from '../../galaxy/Galaxy';
import { TGalaxyData, TgalaxyData } from '../../galaxy/Galaxy.types';
import StartLayout from '../start-layout/StartLayout';
import SelectControl from './select-control/SelectControl';
import { TSelectGalaxy } from './SelectGalaxy.types';
import { densityLabel } from './SelectGalaxy.utils';

const SelectGalaxy: React.FC<TSelectGalaxy> = ({
  galaxyData: galaxyData,
  setGalaxyData: setgalaxyData,
  setView,
  back,
  forward,
}) => {
  const plane = createRef<HTMLDivElement>();
  const species = Array.from(
    {
      length: galaxySpeciesCountMaximum - galaxySpeciesCountMinimum + 1,
    },
    (v, i) => i + 2
  );
  const densities = [...galaxyDensities].reverse();

  const update = (options: TgalaxyData): void => {
    setgalaxyData({
      ...options,
      name: RandomValue(galaxyNames),
      seed: CreateDistributedPoints(options.density),
    });
  };

  const generate = (): void => {
    update({ ...galaxyData });
  };

  const setDensity = (d: number): void => {
    update({ ...galaxyData, density: d });
  };

  const setSpeciesCount = (c: number): void => {
    update({ ...galaxyData, speciesCount: c });
  };

  return (
    <StartLayout setView={setView} back={back} forward={forward}>
      <div className='select_galaxy'>
        <div className='galaxy_name'>{galaxyData.name}</div>
        <div ref={plane} className='galaxy_canvas'>
          <Galaxy data={galaxyData as TGalaxyData} setView={setView} />
        </div>
        <div className='galaxy_controls'>
          <div className='controls_cell'>
            galaxy density{' '}
            <SelectControl
              value={galaxyData.density}
              values={densities}
              max={galaxyDensityVeryDense}
              min={galaxyDensityVerySparse}
              label={densityLabel(galaxyData.density)}
              update={setDensity}
            />
          </div>
          <div className='controls_cell'>
            species count{' '}
            <SelectControl
              value={galaxyData.speciesCount}
              values={species}
              min={galaxySpeciesCountMinimum}
              max={galaxySpeciesCountMaximum}
              label={galaxyData.speciesCount.toString()}
              update={setSpeciesCount}
            />
          </div>
          <div className='controls_cell'>
            <div>generate</div>
            <div className='new_galaxy' onClick={generate}>
              <FontAwesomeIcon icon={faSyncAlt} /> new galaxy
            </div>
          </div>
        </div>
      </div>
    </StartLayout>
  );
};

export default SelectGalaxy;
