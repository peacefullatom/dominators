import './LayoutHeader.scss';

import { faCogs, faPause, faPlay, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { gameDefaultLocation } from '../../../Game.const';
import { commandCenterLocationOptions, commandCenterModeBattle, commandCenterModePause } from '../../CommandCenter.const';
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
  } = useCommandCenter();

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
      <div className='header_control'>
        <FontAwesomeIcon icon={control(mode)} />
      </div>
    </div>
  );
};

export default LayoutHeader;
