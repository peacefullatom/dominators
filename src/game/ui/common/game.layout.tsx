import './game.layout.scss';

import React from 'react';

import Galaxy from '../../galaxy/galaxy';

export type TUiGameLayout = {
  /** galaxy data */
  galaxy: Galaxy;
  /** action for header menu button */
  action: () => void;
  /** header menu button label */
  actionName?: string;
};

const UiGameLayout: React.FC<TUiGameLayout> = ({
  children,
  action,
  actionName,
}) => {
  return (
    <div className='layout'>
      <div className='header'>
        <button className='options' onClick={action}>
          {actionName || 'center'}
        </button>
        <div className='feed'>feed</div>
        <button className='expand'>news</button>
        <button className='pause'>pause</button>
      </div>
      <div className='content'>{children}</div>
    </div>
  );
};

export default UiGameLayout;
