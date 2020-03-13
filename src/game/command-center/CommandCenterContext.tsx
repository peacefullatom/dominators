import React, { createContext, FC, useContext, useMemo, useState } from 'react';

import { gameDefaultLocation } from '../Game.const';
import { commandCenterModePause, commandCenterSpeed1 } from './CommandCenter.const';
import { TCommandCenterContext, TCommandCenterProvider } from './CommandCenterContext.types';

const CommandCenterContext = createContext<TCommandCenterContext | null>(null);

const useCommandCenter = (): TCommandCenterContext => {
  const context = useContext(CommandCenterContext);
  if (!context) {
    throw new Error(
      'useCommandCenter must be used within CommandCenterProvider'
    );
  }
  return context;
};

const CommandCenterProvider: FC<TCommandCenterProvider> = props => {
  const [view, setView] = useState(props.view ?? gameDefaultLocation);
  const [mode, setMode] = useState(props.mode ?? commandCenterModePause);
  const [speed, setSpeed] = useState(props.speed ?? commandCenterSpeed1);
  const value = useMemo(
    () => ({ view, setView, mode, setMode, speed, setSpeed }),
    [view, mode, speed]
  );

  return <CommandCenterContext.Provider value={value} {...props} />;
};

export { useCommandCenter, CommandCenterProvider };
