import './Load.scss';

import React from 'react';

import MenuLayout from '../menu/menu-layout/MenuLayout';
import { TLoad } from './Load.types';

const Load: React.FC<TLoad> = ({ setView }) => {
  return (
    <MenuLayout setView={setView}>
      <div className='load'>to be implemented</div>
    </MenuLayout>
  );
};

export default Load;
