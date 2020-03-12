import React, { useState } from 'react';

import CommandCenter from './command-center/CommandCenter';
import { gameLocationGalaxy, gameLocationHome } from './Game.const';
import { TGame } from './Game.types';
import Menu from './menu/Menu';
import { menuLocationStart } from './menu/Menu.const';

const Game: React.FC<TGame> = ({ view }) => {
  const [screen, setScreen] = useState(view ?? gameLocationHome);

  if (screen === gameLocationGalaxy) {
    return <CommandCenter setView={setScreen} />;
  }

  return <Menu menuView={menuLocationStart} setGameView={setScreen} />;
};

export default Game;
