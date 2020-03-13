import './MenuLayout.scss';

import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';

import { gameDefaultLocation } from '../../Game.const';
import { useMenu } from '../MenuContext';
import { TMenuLayout } from './MenuLayout.types';

const MenuLayout: React.FC<TMenuLayout> = ({ children }) => {
  const { setView } = useMenu();

  const quit = (): void => setView(gameDefaultLocation);

  const keyboard = (event: KeyboardEvent): void => {
    const { keyCode } = event;
    // q
    if (keyCode === 81) {
      quit();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyboard);

    return (): void => document.removeEventListener('keydown', keyboard);
  });

  return (
    <div className='menu_layout'>
      <div className='menu_header'>
        <div className='header_button_home' onClick={quit}>
          <FontAwesomeIcon icon={faHome} />
        </div>
      </div>
      <div className='menu_content'>{children}</div>
    </div>
  );
};

export default MenuLayout;
