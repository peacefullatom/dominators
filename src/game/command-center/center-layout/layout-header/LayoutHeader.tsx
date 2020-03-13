import './LayoutHeader.scss';

import { faCogs, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

import { gameDefaultLocation } from '../../../Game.const';
import { commandCenterLocationOptions, commandCenterModeBattle, commandCenterModePause } from '../../CommandCenter.const';
import { useCommandCenter } from '../../CommandCenterContext';
import { TLayoutHeader } from './LayoutHeader.types';

const LayoutHeader: React.FC<TLayoutHeader> = () => {
  const { view, setView, speed, mode } = useCommandCenter();
  const [feed, setFeed] = useState(``);
  const [control, setControl] = useState(faPause);

  const options = (): void => {
    if (view === commandCenterLocationOptions) {
      setView(gameDefaultLocation);
    } else {
      setView(commandCenterLocationOptions);
    }
  };

  useEffect(() => {
    setFeed(`Speed is set to ${speed}.`);
  }, [speed]);

  useEffect(() => {
    if (mode === commandCenterModePause || mode === commandCenterModeBattle) {
      setControl(faPause);
      setFeed('Game paused');
    } else {
      setControl(faPlay);
      setFeed('Game resumed');
    }
  }, [mode]);

  return (
    <div className='layout_header'>
      <div className='header_options' onClick={options}>
        <FontAwesomeIcon icon={faCogs} />
      </div>
      <div className='header_news'>{feed}</div>
      <div className='header_control'>
        <FontAwesomeIcon icon={control} />
      </div>
    </div>
  );
};

export default LayoutHeader;
