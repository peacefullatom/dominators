import './stats.scss';

import React from 'react';

import UiGameLayout, { TUiGameLayout } from '../common/game.layout';

type TUiStats = {} & TUiGameLayout;

const UiStats: React.FC<TUiStats> = ({ galaxy, action }) => {
  return (
    <UiGameLayout galaxy={galaxy} action={action}>
      Stats view
    </UiGameLayout>
  );
};

export default UiStats;
