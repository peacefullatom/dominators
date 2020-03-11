import './MenuItem.scss';

import React from 'react';

import { TMenuItem } from './MenuItem.types';

const MenuItem: React.FC<TMenuItem> = ({ title, action }) => {
  return (
    <div className='menu_item' onClick={action}>
      {title}
    </div>
  );
};

export default MenuItem;
