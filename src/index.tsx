import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Game from './game/Game';
import { menuLocationStart } from './game/menu/Menu.const';

ReactDOM.render(
  <Game view={menuLocationStart} />,
  document.getElementById('app')
);
