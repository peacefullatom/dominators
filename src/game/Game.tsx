import React, { lazy, useState } from 'react';

import { gameLocationGalaxy, gameLocationHome } from './Game.const';
import { TGame } from './Game.types';

const Game: React.FC<TGame> = ({ view }) => {
  const [screen, setScreen] = useState(view ?? gameLocationHome);
  const CommandCenter = lazy(() => import('./command-center/CommandCenter'));
  const Menu = lazy(() => import('./menu/Menu'));

  if (screen === gameLocationGalaxy) {
    return <CommandCenter setView={setScreen} />;
  }

  return (
    <Menu
      // menuView={menuLocationStart}
      setGameView={setScreen}
    />
  );
};

export default Game;
