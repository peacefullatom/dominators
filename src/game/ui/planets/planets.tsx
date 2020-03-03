import './planets.scss';

import React from 'react';

import UiGameLayout, { TUiGameLayout } from '../common/game.layout';

type TUiPlanets = {} & TUiGameLayout;

const UiPlanets: React.FC<TUiPlanets> = ({ galaxy, action }) => {
  return (
    <UiGameLayout galaxy={galaxy} action={action} actionName={'center'}>
      Planets view
    </UiGameLayout>
  );
};

export default UiPlanets;
