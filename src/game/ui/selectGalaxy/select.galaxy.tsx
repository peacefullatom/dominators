import './select.galaxy.scss';

import React, { useState } from 'react';

import { TPoint } from '../../../types';
import Galaxy from '../../galaxy/galaxy';
import { galaxyDensities, galaxySpeciesCountMinimum } from '../../galaxy/galaxy.const';
import UiStartView, { TUiStartView } from '../common/start.view';
import { densityLabel } from './select.galaxy.util';

type TUiSelectGalaxy = {
  galaxy: Galaxy;
} & TUiStartView;

const UiSelectGalaxy: React.FC<TUiSelectGalaxy> = ({
  home,
  back,
  next,
  galaxy,
  nextDisabled,
}) => {
  const props: TUiStartView = {
    className: 'select galaxy',
    label: 'Select galaxy',
    home,
    back,
    next,
    nextDisabled,
  };

  const [matrix, setMatrix] = useState<TPoint[]>(galaxy.matrix);
  const [density, setDensity] = useState(galaxy.density);
  const [speciesCount, setSpeciesCount] = useState(galaxy.speciesCount);
  const [galaxyName, setGalaxyName] = useState(galaxy.name);
  const parent = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = parent.current;
    if (container) {
      setMatrix(() => {
        galaxy.generate();
        galaxy.embed(container, { systems: true });
        return galaxy.matrix;
      });

      // debug
      // next();
      // debug
    }
  }, [parent]);

  const generate = (): void => {
    galaxy.generate();
    galaxy.redraw();
    setGalaxyName(galaxy.name);
  };

  const updateDensity = (d: number): void => {
    setDensity(() => {
      galaxy.density = d;
      generate();
      return d;
    });
  };

  const updateSpeciesCount = (c: number): void => {
    setSpeciesCount(() => {
      galaxy.speciesCount = c;
      return c;
    });
  };

  const speciesCountList = Array.from(
    {
      length: 6 - galaxySpeciesCountMinimum + 1,
    },
    (v, i) => i + 2
  );

  return (
    <UiStartView {...props}>
      <div ref={parent} className='canvas'>
        {!matrix.length && <div>Please wait...</div>}
      </div>
      <div className='controls'>
        <div className='control'>
          Galaxy density{' '}
          <select
            value={density}
            onChange={(v): void => updateDensity(parseInt(v.target.value))}
          >
            {galaxyDensities.map((d, i) => (
              <option key={i} value={d}>
                {densityLabel(d)}
              </option>
            ))}
          </select>
        </div>
        <div className='control'>
          Species count{' '}
          <select
            value={speciesCount}
            onChange={(v): void => updateSpeciesCount(parseInt(v.target.value))}
          >
            {speciesCountList.map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className='control'>
          <span>Galaxy name: {galaxyName}</span>
        </div>
        <div className='control'>
          <button onClick={(): void => generate()}>New galaxy</button>
        </div>
      </div>
    </UiStartView>
  );
};

export default UiSelectGalaxy;
