import React, { createContext, FC, useContext, useMemo, useState } from 'react';

import { gameDefaultLocation } from '../../Game.const';
import { TStartContext, TStartProvider } from './StartContext.types';

const StartContext = createContext<TStartContext | null>(null);

const useStart = (): TStartContext => {
  const context = useContext(StartContext);
  if (!context) {
    throw new Error('useStart must be used within StartProvider');
  }
  return context;
};

const StartProvider: FC<TStartProvider> = props => {
  const [view, setView] = useState(props.view ?? gameDefaultLocation);
  const value = useMemo(() => ({ view, setView }), [view]);

  return <StartContext.Provider value={value} {...props} />;
};

export { useStart, StartProvider };
