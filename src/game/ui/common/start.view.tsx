import React from 'react';

import UiCommonHeaderWithHomeButtonAndLabel from './header.with.home.button.and.label';
import { TUiCommonHomeButton } from './home.button';
import UiStartNavigation, { TUiStartNavigation } from './start.navigation';

export type TUiStartView = {
  className?: string;
  label?: string;
} & TUiCommonHomeButton &
  TUiStartNavigation;

const UiStartView: React.FC<TUiStartView> = ({
  children,
  className,
  label,
  home,
  back,
  next,
  nextDisabled,
}) => {
  return (
    <div className={className}>
      <UiCommonHeaderWithHomeButtonAndLabel
        home={home}
        label={label ?? 'not set'}
      ></UiCommonHeaderWithHomeButtonAndLabel>
      <div className='content'>{children}</div>
      <UiStartNavigation
        back={back}
        next={next}
        nextDisabled={nextDisabled}
      ></UiStartNavigation>
    </div>
  );
};

export default UiStartView;
