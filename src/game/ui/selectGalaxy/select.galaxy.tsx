import './select.galaxy.scss';

import React from 'react';

import { TGalaxy } from '../../galaxy/galaxy';
import UiStartView, { TUiStartView } from '../common/start.view';

type TUiSelectGalaxy = {
  galaxy: TGalaxy;
  setGalaxy: (g: TGalaxy) => void;
} & TUiStartView;

const UiSelectGalaxy: React.FC<TUiSelectGalaxy> = ({
  home,
  back,
  next,
  galaxy,
  nextDisabled,
  setGalaxy,
}) => {
  console.log(galaxy);

  const props: TUiStartView = {
    className: 'select galaxy',
    label: 'Select galaxy',
    home,
    back,
    next,
    nextDisabled,
  };

  return <UiStartView {...props}>test!</UiStartView>;
};

export default UiSelectGalaxy;
