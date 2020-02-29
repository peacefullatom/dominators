import './home.scss';

import React from 'react';

import UiCommonFooterWithVersion from '../common/footer.with.version';
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
  intro: () => void;
  start: () => void;
  load: () => void;
};

const UiHome: React.FC<TUiHome> = ({ intro, start, load }) => {
  const buttons: TButton[] = [
    { label: 'Intro', action: intro },
    { label: 'Start', action: start },
    { label: 'Load', action: load },
  ];
  return (
    <div className='home'>
      <UiCommonHeader>Galaxy</UiCommonHeader>
      <div className='menu'>
        {buttons.map((b, i) => (
          <Button key={i} {...b}></Button>
        ))}
      </div>
      <UiCommonFooterWithVersion></UiCommonFooterWithVersion>
    </div>
  );
};

export default UiHome;
