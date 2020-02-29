import './home.button.scss';

import React from 'react';

export type TUiCommonHomeButton = {
  home: () => void;
};

const UiCommonHomeButton: React.FC<TUiCommonHomeButton> = ({ home }) => {
  return (
    <button className='home button' onClick={(): void => home()}>
      Home
    </button>
  );
};

export default UiCommonHomeButton;
