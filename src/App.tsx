import React, { lazy, Suspense } from 'react';

import { TApp } from './App.types';
import { gameLocationGalaxy } from './game/Game.const';
import Spinner from './Spinner';

const App: React.FC<TApp> = () => {
  const GalaxyProvider = lazy(() =>
    import('./game/galaxy/GalaxyContext').then(m => ({
      default: m.GalaxyProvider,
    }))
  );
  const GameProvider = lazy(() =>
    import('./game/GameContext').then(m => ({ default: m.GameProvider }))
  );
  const Game = lazy(() => import('./game/Game'));
  return (
    <Suspense fallback={<Spinner />}>
      <GalaxyProvider>
        <GameProvider view={gameLocationGalaxy}>
          {/* <GameProvider> */}
          <Game />
        </GameProvider>
      </GalaxyProvider>
    </Suspense>
  );
};

export default App;
