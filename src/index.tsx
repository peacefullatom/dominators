import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Game from './game/game';
import { uiLocationSelectGalaxy } from './game/ui/ui.const';

ReactDOM.render(
  <Game view={uiLocationSelectGalaxy} />,
  document.getElementById('app')
);
