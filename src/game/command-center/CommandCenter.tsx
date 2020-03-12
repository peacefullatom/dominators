import './CommandCenter.scss';

import React from 'react';

import CenterLayout from './center-layout/CenterLayout';
import { TCommandCenter } from './CommandCenter.types';

const CommandCenter: React.FC<TCommandCenter> = ({ setView }) => {
  return (
    <CenterLayout setView={setView}>
      <div>galaxy map</div>
      <div>controls</div>
    </CenterLayout>
  );
};

export default CommandCenter;
