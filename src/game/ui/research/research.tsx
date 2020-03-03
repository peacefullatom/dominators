import './research.scss';

import React from 'react';

import UiGameLayout, { TUiGameLayout } from '../common/game.layout';

type TUiResearch = {} & TUiGameLayout;

const UiResearch: React.FC<TUiResearch> = ({ galaxy, action }) => {
  return (
    <UiGameLayout galaxy={galaxy} action={action} actionName={'center'}>
      research view
    </UiGameLayout>
  );
};

export default UiResearch;
