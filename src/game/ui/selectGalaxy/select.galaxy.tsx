import './select.galaxy.scss';

import React from 'react';

import { TGalaxy } from '../../galaxy/galaxy';
import UiCommonHeaderWithHomeButtonAndLabel from '../common/header.with.home.button.and.label';
import { TUiCommonHomeButton } from '../common/home.button';
import UiStartNavigation, { TUiStartNavigation } from '../common/start.navigation';

type TUiSelectGalaxy = {
  galaxy: TGalaxy;
  setGalaxy: (g: TGalaxy) => void;
} & TUiCommonHomeButton &
  TUiStartNavigation;

const UiSelectGalaxy: React.FC<TUiSelectGalaxy> = ({
  home,
  back,
  next,
  galaxy,
  nextDisabled,
  setGalaxy,
}) => {
  console.log(galaxy);
  return (
    <div className='select galaxy'>
      <UiCommonHeaderWithHomeButtonAndLabel
        home={home}
        label={'Select galaxy'}
      ></UiCommonHeaderWithHomeButtonAndLabel>
      <div className='content'></div>
      <UiStartNavigation
        back={back}
        next={next}
        nextDisabled={nextDisabled}
      ></UiStartNavigation>
    </div>
  );
};

export default UiSelectGalaxy;
