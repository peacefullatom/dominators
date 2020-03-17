import './System.scss';

import React from 'react';

import { TSystem } from './System.types';

const System: React.FC<TSystem> = props => {
  console.log(props);
  return <div>system</div>;
};

export default System;
