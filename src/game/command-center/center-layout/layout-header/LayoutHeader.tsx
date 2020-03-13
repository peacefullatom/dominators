import './LayoutHeader.scss';

import { faCogs, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

import { gameDefaultLocation } from '../../../Game.const';
import { commandCenterLocationOptions, commandCenterModeBattle, commandCenterModePause } from '../../CommandCenter.const';
import { useCommandCenter } from '../../CommandCenterContext';
import { TLayoutHeader } from './LayoutHeader.types';

const LayoutHeader: React.FC<TLayoutHeader> = () => {
  const {
    view,
    setView,
    speed,
    mode,
    showNews,
    setShowNews,
    feed,
    setFeed,
  } = useCommandCenter();
  const [news, setNews] = useState(``);
  const [control, setControl] = useState(faPause);

  const updateFeed = (data: string): void => {
    const update = [...feed];
    if (update.length > 4) {
      update.pop();
    }
    update.unshift(data);
    setFeed(update);
    setNews(data);
  };

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

  useEffect(() => {
    updateFeed(`Speed is set to ${speed}.`);
  }, [speed]);

  useEffect(() => {
    if (mode === commandCenterModePause || mode === commandCenterModeBattle) {
      setControl(faPause);
      updateFeed('Game paused');
    } else {
      setControl(faPlay);
      updateFeed('Game resumed');
    }
  }, [mode]);

  return (
    <div className='layout_header'>
      <div className='header_options' onClick={options}>
        <FontAwesomeIcon icon={faCogs} />
      </div>
      <div className='header_news'>
        <div className='news_item' onClick={toggleFeed}>
          {news}
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
        <FontAwesomeIcon icon={control} />
      </div>
    </div>
  );
};

export default LayoutHeader;
