import './Galaxy.scss';

import React, { useEffect, useRef } from 'react';

import useElementDimensions from '../../hook/useElementDimensions';
import { TGalaxy } from './Galaxy.types';

const Galaxy: React.FC<TGalaxy> = ({ setView, data }) => {
  const galaxyRef = useRef<HTMLDivElement>(null);
  const galaxyCanvasRef = useRef<HTMLCanvasElement>(null);
  const galaxyDimensions = useElementDimensions(galaxyRef);

  useEffect(() => {
    const { current } = galaxyCanvasRef;
    if (current && galaxyDimensions) {
      current.width = galaxyDimensions.width;
      current.height = galaxyDimensions.height;
    }
  }, [galaxyCanvasRef, galaxyDimensions]);

  useEffect(() => {
    const { current } = galaxyCanvasRef;
    if (current && galaxyDimensions) {
      const ctx = current.getContext('2d');
      data.systems = data.seed.map(s => ({
        id: 'string',
        name: '',
        planets: [],
        coordinates: {
          x: (s.x * current.width) / 100,
          y: (s.y * current.height) / 100,
        },
      }));
      if (ctx) {
        ctx.clearRect(0, 0, current.width, current.height);
        data.systems.forEach(s => {
          ctx.fillStyle = '#B5CEA8';
          ctx.beginPath();
          ctx.arc(s.coordinates.x, s.coordinates.y, 5, 0, 2 * Math.PI);
          ctx.fill();
        });
      }
    }
  }, [galaxyCanvasRef, galaxyDimensions, data]);

  return (
    <div ref={galaxyRef} className='galaxy'>
      <canvas ref={galaxyCanvasRef}></canvas>
    </div>
  );
};

export default Galaxy;
