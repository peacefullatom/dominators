import './espionage.scss';

import React from 'react';

import UiGameLayout, { TUiGameLayout } from '../common/game.layout';

type TUiEspionage = {} & TUiGameLayout;

const UiEspionage: React.FC<TUiEspionage> = ({ galaxy, action }) => {
  return (
    <UiGameLayout galaxy={galaxy} action={action}>
      Espionage view
    </UiGameLayout>
  );
};

export default UiEspionage;
