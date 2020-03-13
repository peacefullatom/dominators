import './Planets.scss';

import React from 'react';

import CenterLayout from '../center-layout/CenterLayout';
import { TPlanets } from './Planets.types';

const Planets: React.FC<TPlanets> = () => {
  return <CenterLayout>Planets</CenterLayout>;
};

export default Planets;
