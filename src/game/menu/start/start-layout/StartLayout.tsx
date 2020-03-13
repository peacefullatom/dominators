import './StartLayout.scss';

import { faAngleDoubleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';

import MenuLayout from '../../menu-layout/MenuLayout';
import { TStartLayout } from './StartLayout.types';

const StartLayout: React.FC<TStartLayout> = ({ children, back, forward }) => {
  const keyboard = (event: KeyboardEvent): void => {
    const { keyCode } = event;
    // n
    if (keyCode === 78 && typeof forward === 'function') {
      forward();
    }
    // b
    if (keyCode === 66 && typeof back === 'function') {
      back();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyboard);

    return (): void => document.removeEventListener('keydown', keyboard);
  });

  return (
    <MenuLayout>
      <div className='start_layout'>
        <div className='layout_content'>{children}</div>
        <div className='layout_navigation'>
          {typeof back === 'function' && (
            <div onClick={back} className='navigate navigate_back'>
              <FontAwesomeIcon icon={faAngleLeft} />
            </div>
          )}
          {typeof forward === 'function' && (
            <div onClick={forward} className='navigate navigate_forward'>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </div>
          )}
        </div>
      </div>
    </MenuLayout>
  );
};

export default StartLayout;
