import React, { lazy } from 'react';

import CommandCenter from './command-center/CommandCenter';
import { gameLocationGalaxy } from './Game.const';
import { TGame } from './Game.types';
import { useGame } from './GameContext';
import Menu from './menu/Menu';

const Game: React.FC<TGame> = () => {
  const { view } = useGame();
  const CommandCenterProvider = lazy(() =>
    import('./command-center/CommandCenterContext').then(m => ({
      default: m.CommandCenterProvider,
    }))
  );
  const MenuProvider = lazy(() =>
    import('./menu/MenuContext').then(m => ({ default: m.MenuProvider }))
  );

  if (view === gameLocationGalaxy) {
    return (
      <CommandCenterProvider>
        <CommandCenter />
      </CommandCenterProvider>
    );
  }

  return (
    <MenuProvider>
      <Menu />
    </MenuProvider>
  );
};

export default Game;
