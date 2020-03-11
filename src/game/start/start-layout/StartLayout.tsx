import './StartLayout.scss';

import { faAngleDoubleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import MenuLayout from '../../menu/menu-layout/MenuLayout';
import { TStartLayout } from './StartLayout.types';

const StartLayout: React.FC<TStartLayout> = ({
  children,
  setView,
  back,
  forward,
}) => {
  return (
    <MenuLayout setView={setView}>
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
