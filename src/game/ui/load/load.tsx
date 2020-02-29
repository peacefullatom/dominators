import './load.scss';

import React from 'react';

import UiCommonFooterWithVersion from '../common/footer.with.version';
import UiCommonHeaderWithHomeButtonAndLabel from '../common/header.with.home.button.and.label';
import { TUiCommonHomeButton } from '../common/home.button';

type TUiLoad = {} & TUiCommonHomeButton;

const UiLoad: React.FC<TUiLoad> = ({ home }) => {
  return (
    <div className='load'>
      <UiCommonHeaderWithHomeButtonAndLabel
        home={home}
        label={'Load'}
      ></UiCommonHeaderWithHomeButtonAndLabel>
      <div className='content'>to be implemented</div>
      <UiCommonFooterWithVersion></UiCommonFooterWithVersion>
    </div>
  );
};

export default UiLoad;
