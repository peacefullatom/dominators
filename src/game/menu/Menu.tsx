import './Menu.scss';

import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy, useEffect } from 'react';

import About from './about/About';
import Intro from './intro/Intro';
import Load from './load/Load';
import MenuItem from './menu-item/MenuItem';
import { TMenuItem } from './menu-item/MenuItem.types';
import { menuLocationAbout, menuLocationIntro, menuLocationLoad, menuLocationStart } from './Menu.const';
import { TMenu } from './Menu.types';
import { useMenu } from './MenuContext';
import Start from './start/Start';

const Menu: React.FC<TMenu> = () => {
  const { view, setView } = useMenu();
  const intro = (): void => setView(menuLocationIntro);
  const start = (): void => setView(menuLocationStart);
  const load = (): void => setView(menuLocationLoad);
  const about = (): void => setView(menuLocationAbout);
  const items: TMenuItem[] = [
    { title: 'Intro', action: intro },
    { title: 'Start', action: start },
    { title: 'Load', action: load },
    { title: 'About', action: about },
  ];
  const StartProvider = lazy(() =>
    import('./start/StartContext').then(m => ({ default: m.StartProvider }))
  );

  const keyboard = (event: KeyboardEvent): void => {
    const { keyCode } = event;
    // i
    if (keyCode === 73) {
      intro();
    }
    // s
    if (keyCode === 83) {
      start();
    }
    // l
    if (keyCode === 76) {
      load();
    }
    // a
    if (keyCode === 65) {
      about();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyboard);

    return (): void => document.removeEventListener('keydown', keyboard);
  });

  if (view === menuLocationIntro) {
    return <Intro />;
  }

  if (view === menuLocationStart) {
    return (
      <StartProvider>
        <Start />
      </StartProvider>
    );
  }

  if (view === menuLocationLoad) {
    return <Load />;
  }

  if (view === menuLocationAbout) {
    return <About />;
  }

  return (
    <div className='menu'>
      {items.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
      <div className='menu_contact'>
        <a
          href='https://twitter.com/dominators_game'
          target='_blank'
          rel='noopener noreferrer'
        >
          Follow me for the updates! <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
    </div>
  );
};

export default Menu;
