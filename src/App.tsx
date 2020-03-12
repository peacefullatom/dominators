import React, { lazy, Suspense } from 'react';

import { TApp } from './App.types';
import Spinner from './Spinner';

const App: React.FC<TApp> = () => {
  const GalaxyProvider = lazy(() =>
    import('./game/galaxy/GalaxyContext').then(m => ({
      default: m.GalaxyProvider,
    }))
  );
  const Game = lazy(() => import('./game/Game'));
  return (
    <Suspense fallback={<Spinner />}>
      <GalaxyProvider>
        <Game />
      </GalaxyProvider>
    </Suspense>
  );
};

export default App;
