import './SystemCanvas.scss';

import React, { createRef, useEffect } from 'react';

import { TSystemCanvas } from './SystemCanvas.types';
import { systemCanvasWormholes } from './SystemCanvas.utils';

const SystemCanvas: React.FC<TSystemCanvas> = ({
  width,
  height,
  planets,
  wormholes,
}) => {
  const settings = [
    { id: 'wormholes', ref: createRef<HTMLCanvasElement>() },
    { id: 'planets', ref: createRef<HTMLCanvasElement>() },
    { id: 'star', ref: createRef<HTMLCanvasElement>() },
  ];

  useEffect(() => {
    const wormholesRef = settings.find(s => s.id === 'wormholes');
    if (wormholesRef?.ref.current) {
      systemCanvasWormholes(wormholesRef.ref.current, width, height, wormholes);
    }
  }, [width, height]);

  return (
    <div className='system_canvas_container'>
      {settings.map((s, i) => {
        return (
          <canvas
            key={i}
            ref={s.ref}
            id={s.id}
            className='system_canvas_layer'
            width={width}
            height={height}
          ></canvas>
        );
      })}
    </div>
  );
};

export default SystemCanvas;
