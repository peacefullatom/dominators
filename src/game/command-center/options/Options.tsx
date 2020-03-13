import './Options.scss';

import React from 'react';

import { gameDefaultLocation } from '../../Game.const';
import { useGame } from '../../GameContext';
import CenterLayout from '../center-layout/CenterLayout';
import { commandCenterSpeed1, commandCenterSpeed7 } from '../CommandCenter.const';
import { useCommandCenter } from '../CommandCenterContext';
import { TOptions } from './Options.types';

const Options: React.FC<TOptions> = () => {
  const { speed, setSpeed } = useCommandCenter();
  const { setView } = useGame();

  const speedList = Array.from(
    { length: commandCenterSpeed7 },
    (v, i) => i + 1
  );

  const slower = (): void => {
    if (speed > commandCenterSpeed1) {
      setSpeed(speed - 1);
    }
  };

  const faster = (): void => {
    if (speed < commandCenterSpeed7) {
      setSpeed(speed + 1);
    }
  };

  const quit = (): void => {
    setView(gameDefaultLocation);
  };

  return (
    <CenterLayout>
      <div className='options'>
        <div className='options_speed'>game speed</div>
        <div className='options_speed'>
          <div className='speed_button' onClick={slower}>
            slower
          </div>
          {speedList.map((s, i) => (
            <div
              key={i}
              className={`speed_option ${speed === s ? 'selected' : ''}`}
              onClick={(): void => setSpeed(s)}
            >
              {s}
            </div>
          ))}
          <div className='speed_button' onClick={faster}>
            faster
          </div>
        </div>
        <div className='options_menu'>
          <div className='menu_item'>Save</div>
          <div className='menu_item'>Load</div>
          <div className='menu_item' onClick={quit}>
            Quit
          </div>
        </div>
      </div>
    </CenterLayout>
  );
};

export default Options;
