import './start.navigation.scss';

import React from 'react';

import UiCommonFooter from './footer';

export type TUiStartNavigation = {
  back: () => void;
  next: () => void;
  nextDisabled?: boolean;
};

const UiStartNavigation: React.FC<TUiStartNavigation> = ({
  back,
  next,
  nextDisabled,
}) => {
  return (
    <div className='start navigation'>
      <UiCommonFooter>
        <button className='button back' onClick={back}>
          Back
        </button>
        <button className='button next' onClick={next} disabled={nextDisabled}>
          Next
        </button>
      </UiCommonFooter>
    </div>
  );
};

export default UiStartNavigation;
