import './CommandCenter.scss';

import React from 'react';

import Galaxy from '../galaxy/Galaxy';
import CenterLayout from './center-layout/CenterLayout';
import { commandCenterLocationOptions } from './CommandCenter.const';
import { TCommandCenter } from './CommandCenter.types';
import { useCommandCenter } from './CommandCenterContext';
import Options from './options/Options';

const CommandCenter: React.FC<TCommandCenter> = () => {
  const { view } = useCommandCenter();

  if (view === commandCenterLocationOptions) {
    return <Options />;
  }

  const locations = ['fleet', 'research', 'espionage', 'planets', 'stats'];

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
