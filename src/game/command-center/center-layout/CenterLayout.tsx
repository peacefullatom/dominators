import './CenterLayout.scss';

import React from 'react';

import { TCenterLayout } from './CenterLayout.types';
import LayoutHeader from './layout-header/LayoutHeader';

const CenterLayout: React.FC<TCenterLayout> = ({ children, setView }) => {
  return (
    <div>
      <LayoutHeader setView={setView}></LayoutHeader>
      {children}
    </div>
  );
};

export default CenterLayout;
