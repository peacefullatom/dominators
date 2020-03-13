import './CenterLayout.scss';

import React, { useEffect } from 'react';

import { gameDefaultLocation } from '../../Game.const';
import {
  commandCenterLocationEspionage,
  commandCenterLocationFleet,
  commandCenterLocationOptions,
  commandCenterLocationPlanets,
  commandCenterLocationResearch,
  commandCenterModePause,
  commandCenterModePlay,
  commandCenterSpeed1,
  commandCenterSpeed7,
} from '../CommandCenter.const';
import { useCommandCenter } from '../CommandCenterContext';
import { TCenterLayout } from './CenterLayout.types';
import LayoutHeader from './layout-header/LayoutHeader';

const CenterLayout: React.FC<TCenterLayout> = ({ children }) => {
  const {
    speed,
    setSpeed,
    mode,
    setMode,
    setView,
    view,
    showNews,
    setShowNews,
  } = useCommandCenter();
  const keyboard = (event: KeyboardEvent): void => {
    const { keyCode } = event;
    // +
    if ((keyCode === 187 || keyCode === 107) && speed < commandCenterSpeed7) {
      setSpeed(speed + 1);
    }
    // -
    if ((keyCode === 189 || keyCode === 109) && speed > commandCenterSpeed1) {
      setSpeed(speed - 1);
    }
    // p
    if (keyCode === 80) {
      if (mode === commandCenterModePause) {
        setMode(commandCenterModePlay);
      } else if (mode === commandCenterModePlay) {
        setMode(commandCenterModePause);
      }
    }
    // q
    if (keyCode === 81) {
      if (view !== commandCenterLocationOptions) {
        setView(commandCenterLocationOptions);
      } else if (view === commandCenterLocationOptions) {
        setView(gameDefaultLocation);
      }
    }
    // n
    if (keyCode === 78) {
      setShowNews(!showNews);
    }
    // 1
    if (keyCode === 49 || keyCode === 97) {
      setView(commandCenterLocationFleet);
    }
    // 2
    if (keyCode === 50 || keyCode === 98) {
      setView(commandCenterLocationResearch);
    }
    // 3
    if (keyCode === 51 || keyCode === 99) {
      setView(commandCenterLocationEspionage);
    }
    // 4
    if (keyCode === 52 || keyCode === 100) {
      setView(commandCenterLocationPlanets);
    }
    // 5
    if (keyCode === 53 || keyCode === 101) {
      setView(commandCenterLocationPlanets);
    }
  };

  const mouse = (event: MouseEvent): void => {
    console.log(event.target);
    if (event.target) {
      const name = (event.target as HTMLElement).className;
      if (!name.match(/new_item/)) {
        setShowNews(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyboard);
    document.addEventListener('mousedown', mouse);

    return (): void => {
      document.removeEventListener('keydown', keyboard);
      document.removeEventListener('mousedown', mouse);
    };
  });

  return (
    <div className='center_layout'>
      <LayoutHeader />
      {children}
    </div>
  );
};

export default CenterLayout;
