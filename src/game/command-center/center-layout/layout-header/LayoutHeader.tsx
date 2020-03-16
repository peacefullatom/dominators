import './LayoutHeader.scss';

import { faCogs, faPause, faPlay, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import padZero from '../../../../util/padZero';
import { useGalaxy } from '../../../galaxy/GalaxyContext';
import { gameDefaultLocation } from '../../../Game.const';
import {
  commandCenterLocationOptions,
  commandCenterModeBattle,
  commandCenterModePause,
  commandCenterModePlay,
} from '../../CommandCenter.const';
import { useCommandCenter } from '../../CommandCenterContext';
import { TLayoutHeader } from './LayoutHeader.types';

const control = (mode: number): IconDefinition => {
  if (mode === commandCenterModePause || mode === commandCenterModeBattle) {
    return faPause;
  }

  return faPlay;
};

const LayoutHeader: React.FC<TLayoutHeader> = () => {
  const {
    view,
    setView,
    mode,
    showNews,
    setShowNews,
    feed,
    setMode,
  } = useCommandCenter();
  const { galaxy } = useGalaxy();
  const roughDate = padZero(galaxy.date, 5);
  const date = `${roughDate.substr(0, 4)}.${roughDate.substr(4, 1)}`;

  const options = (): void => {
    if (view === commandCenterLocationOptions) {
      setView(gameDefaultLocation);
    } else {
      setView(commandCenterLocationOptions);
    }
  };

  const toggleFeed = (): void => {
    if (showNews) {
      setShowNews(false);
    } else {
      if (feed.length > 1) {
        setShowNews(true);
      }
    }
  };

  const toggleMode = (): void => {
    setMode(
      mode === commandCenterModePause
        ? commandCenterModePlay
        : commandCenterModePause
    );
  };

  return (
    <div className='layout_header'>
      <div className='header_options' onClick={options}>
        <FontAwesomeIcon icon={faCogs} />
      </div>
      <div className='header_news'>
        <div className='news_item' onClick={toggleFeed}>
          {[...feed].shift()}
        </div>
        {showNews && feed.length > 1 && (
          <div className='news_list' onClick={(): void => setShowNews(false)}>
            {[...feed].slice(1, feed.length).map((n, i) => (
              <div key={i} className='news_item'>
                {n}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='header_date'>{date}</div>
      <div className='header_control' onClick={toggleMode}>
        <FontAwesomeIcon icon={control(mode)} />
      </div>
    </div>
  );
};

export default LayoutHeader;
