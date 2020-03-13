import './LayoutHeader.scss';

import { faCogs, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { gameDefaultLocation } from '../../../Game.const';
import { commandCenterLocationOptions } from '../../CommandCenter.const';
import { useCommandCenter } from '../../CommandCenterContext';
import { TLayoutHeader } from './LayoutHeader.types';

const LayoutHeader: React.FC<TLayoutHeader> = () => {
  const { view: screen, setView: setScreen } = useCommandCenter();

  const options = (): void => {
    if (screen === commandCenterLocationOptions) {
      setScreen(gameDefaultLocation);
    } else {
      setScreen(commandCenterLocationOptions);
    }
  };

  return (
    <div className='layout_header'>
      <div className='header_options' onClick={options}>
        <FontAwesomeIcon icon={faCogs} />
      </div>
      <div className='header_news'></div>
      <div className='header_control'>
        <FontAwesomeIcon icon={faPause} />
      </div>
    </div>
  );
};

export default LayoutHeader;
