import React, { createContext, FC, useContext, useMemo, useState } from 'react';

import { gameDefaultLocation } from '../Game.const';
import { TMenuContext, TMenuProvider } from './MenuContext.types';

const MenuContext = createContext<TMenuContext | null>(null);

const useMenu = (): TMenuContext => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within MenuProvider');
  }
  return context;
};

const MenuProvider: FC<TMenuProvider> = props => {
  const [view, setView] = useState(props.view ?? gameDefaultLocation);
  const value = useMemo(() => ({ view, setView }), [view]);

  return <MenuContext.Provider value={value} {...props} />;
};

export { useMenu, MenuProvider };
