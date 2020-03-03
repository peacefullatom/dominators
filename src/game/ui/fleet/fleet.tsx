import './fleet.scss';

import React from 'react';

import UiGameLayout, { TUiGameLayout } from '../common/game.layout';

type TUiFleet = {} & TUiGameLayout;

const UiFleet: React.FC<TUiFleet> = ({ galaxy, action }) => {
  return (
    <UiGameLayout galaxy={galaxy} action={action} actionName={'center'}>
      fleet view
    </UiGameLayout>
  );
};

export default UiFleet;
