import './menu.scss';

import React from 'react';

type TUiMenu = {
  home: () => void;
};

const UiMenu: React.FC<TUiMenu> = ({ home }) => {
  return (
    <div className='menu'>
      <div className='column'>
        <button onClick={home}>Home</button>
        <button>Settings</button>
      </div>
      <div className='column'>
        <button>Save</button>
        <button>Load</button>
      </div>
    </div>
  );
};

export default UiMenu;
