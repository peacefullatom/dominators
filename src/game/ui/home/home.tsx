import './home.scss';

import React from 'react';

import * as config from '../../../../package.json';
import UiCommonFooter from '../common/footer';
import UiCommonHeader from '../common/header';

type TButton = {
  label: string;
  action?: () => void;
};

const Button: React.FC<TButton> = ({ label, action }) => {
  return (
    <button
      className='button'
      onClick={(): void => {
        if (typeof action === 'function') {
          action();
        }
      }}
    >
      {label}
    </button>
  );
};

type TUiHome = {
  start: () => void;
  load: () => void;
};

const UiHome: React.FC<TUiHome> = ({ start, load }) => {
  const buttons: TButton[] = [
    { label: 'Start', action: (): void => start() },
    { label: 'Load', action: (): void => load() },
  ];
  return (
    <div className='home'>
      <UiCommonHeader>Galaxy</UiCommonHeader>
      <div className='menu'>
        {buttons.map((b, i) => (
          <Button key={i} {...b}></Button>
        ))}
      </div>
      <UiCommonFooter>v. {config.version}</UiCommonFooter>
    </div>
  );
};

export default UiHome;
