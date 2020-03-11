import './MenuLayout.scss';

import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { gameDefaultLocation } from '../../Game.const';
import { TMenuLayout } from './MenuLayout.types';

const MenuLayout: React.FC<TMenuLayout> = ({ children, setView }) => {
  return (
    <div className='menu_layout'>
      <div className='menu_header'>
        <div
          className='header_button_home'
          onClick={(): void => setView(gameDefaultLocation)}
        >
          <FontAwesomeIcon icon={faHome} />
        </div>
      </div>
      <div className='menu_content'>{children}</div>
    </div>
  );
};

export default MenuLayout;
