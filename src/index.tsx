import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

window.requestAnimFrame = (function(): ((
  callback: FrameRequestCallback
) => number) &
  ((callback: FrameRequestCallback) => number) {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback): void {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

ReactDOM.render(<App />, document.getElementById('app'));
