import React, { createContext, FC, useContext, useMemo, useState } from 'react';

import { gameDefaultLocation } from './Game.const';
import { TGameContext, TGameProvider } from './GameContext.types';

const GameContext = createContext<TGameContext | null>(null);

const useGame = (): TGameContext => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

const GameProvider: FC<TGameProvider> = props => {
  const [view, setView] = useState(props.view ?? gameDefaultLocation);
  const value = useMemo(() => ({ view, setView }), [view]);

  return <GameContext.Provider value={value} {...props} />;
};

const GameConsumer = GameContext.Consumer;

export { useGame, GameProvider, GameConsumer };
