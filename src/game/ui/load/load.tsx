import './load.scss';

import React from 'react';

import * as config from '../../../../package.json';
import UiCommonFooter from '../common/footer';
import UiCommonHeaderWithHomeButtonAndLabel from '../common/header.with.home.button.and.label';
import { TUiCommonHomeButton } from '../common/home.button';

type TUiLoad = {} & TUiCommonHomeButton;

const UiLoad: React.FC<TUiLoad> = ({ home }) => {
  return (
    <div>
      <UiCommonHeaderWithHomeButtonAndLabel
        home={home}
        label={'Load'}
      ></UiCommonHeaderWithHomeButtonAndLabel>
      <div className='content'>to be implemented</div>
      <UiCommonFooter>v. {config.version}</UiCommonFooter>
    </div>
  );
};

export default UiLoad;
