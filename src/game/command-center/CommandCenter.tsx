import './CommandCenter.scss';

import React from 'react';

import Galaxy from '../galaxy/Galaxy';
import CenterLayout from './center-layout/CenterLayout';
import {
  commandCenterLocationEspionage,
  commandCenterLocationFleet,
  commandCenterLocationOptions,
  commandCenterLocationPlanets,
  commandCenterLocationResearch,
  commandCenterLocationStats,
} from './CommandCenter.const';
import { TCommandCenter } from './CommandCenter.types';
import { useCommandCenter } from './CommandCenterContext';
import Espionage from './espionage/Espionage';
import Fleet from './fleet/Fleet';
import Options from './options/Options';
import Planets from './planets/Planets';
import Research from './research/Research';
import Stats from './stats/Stats';

const CommandCenter: React.FC<TCommandCenter> = () => {
  const { view } = useCommandCenter();

  const locations = ['fleet', 'research', 'espionage', 'planets', 'stats'];

  if (view === commandCenterLocationOptions) {
    return <Options />;
  }

  if (view === commandCenterLocationFleet) {
    return <Fleet />;
  }

  if (view === commandCenterLocationResearch) {
    return <Research />;
  }

  if (view === commandCenterLocationEspionage) {
    return <Espionage />;
  }

  if (view === commandCenterLocationPlanets) {
    return <Planets />;
  }

  if (view === commandCenterLocationStats) {
    return <Stats />;
  }

  return (
    <CenterLayout>
      <div className='center_galaxy'>
        <Galaxy />
      </div>
      <div className='center_controls'>
        {locations.map((l, i) => (
          <div key={i} className='controls_item'>
            {l}
          </div>
        ))}
      </div>
    </CenterLayout>
  );
};

export default CommandCenter;
