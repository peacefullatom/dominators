import React from 'react';

import { TApp } from './App.types';
import { GalaxyProvider } from './game/galaxy/GalaxyContext';
import Game from './game/Game';

const App: React.FC<TApp> = () => {
  return (
    <GalaxyProvider>
      <Game />
    </GalaxyProvider>
  );
};

export default App;
