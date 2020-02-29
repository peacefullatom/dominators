import './header.with.home.button.and.label.scss';

import React from 'react';

import UiCommonHeader from './header';
import UiCommonHomeButton from './home.button';

type TUiCommonHeaderWithHomeButtonAndLabel = {
  label: string;
  home: () => void;
};

const UiCommonHeaderWithHomeButtonAndLabel: React.FC<TUiCommonHeaderWithHomeButtonAndLabel> = ({
  home,
  label,
}) => {
  return (
    <UiCommonHeader>
      <div className='header layout'>
        <div className='button'>
          <UiCommonHomeButton home={(): void => home()}></UiCommonHomeButton>
        </div>
        <div className='label'>{label}</div>
      </div>
    </UiCommonHeader>
  );
};

export default UiCommonHeaderWithHomeButtonAndLabel;
