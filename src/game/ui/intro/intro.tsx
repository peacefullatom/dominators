import './intro.scss';

import React from 'react';

import UiCommonFooterWithVersion from '../common/footer.with.version';
import UiCommonHeaderWithHomeButtonAndLabel from '../common/header.with.home.button.and.label';
import { TUiCommonHomeButton } from '../common/home.button';

type TUiIntro = {} & TUiCommonHomeButton;

const UiIntro: React.FC<TUiIntro> = ({ home }) => {
  return (
    <div className='intro'>
      <UiCommonHeaderWithHomeButtonAndLabel
        label={'Intro'}
        home={home}
      ></UiCommonHeaderWithHomeButtonAndLabel>
      <div className='content'>
        As your species have reached the apex of the technological conundrum...
      </div>
      <UiCommonFooterWithVersion></UiCommonFooterWithVersion>
    </div>
  );
};

export default UiIntro;
