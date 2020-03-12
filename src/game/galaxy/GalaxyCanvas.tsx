import './GalaxyCanvas.scss';

import React, { createRef, Fragment, useEffect } from 'react';

import { TGalaxyCanvas } from './GalaxyCanvas.types';
import { galaxyCanvasClear, galaxyCanvasCoordinate } from './GalaxyCanvas.utils';
import { useGalaxy } from './GalaxyContext';

const GalaxyCanvas: React.FC<TGalaxyCanvas> = ({ width, height, layers }) => {
  const { galaxy } = useGalaxy();
  const backgroundRef = createRef<HTMLCanvasElement>();
  const wormholesRef = createRef<HTMLCanvasElement>();
  const systemsRef = createRef<HTMLCanvasElement>();
  const popupsRef = createRef<HTMLCanvasElement>();
  const visibleLayers = layers ?? { systems: true };

  useEffect(() => {
    if (visibleLayers.systems && systemsRef.current && width && height) {
      const { current } = systemsRef;
      galaxyCanvasClear(current);
      const ctx = current.getContext('2d');
      if (ctx) {
        galaxy.systems.forEach(s => {
          const { x, y } = s.coordinates;
          ctx.fillStyle = '#B5CEA8';
          ctx.beginPath();
          ctx.arc(
            galaxyCanvasCoordinate(x, width),
            galaxyCanvasCoordinate(y, height),
            5,
            0,
            2 * Math.PI
          );
          ctx.fill();
        });
      }
    }
  }, [systemsRef, galaxy, width, height]);

  return (
    <Fragment>
      {visibleLayers.background && (
        <canvas
          ref={backgroundRef}
          className='galaxy_canvas_layer'
          id='background'
          width={width}
          height={height}
        ></canvas>
      )}
      {visibleLayers.wormholes && (
        <canvas
          ref={wormholesRef}
          className='galaxy_canvas_layer'
          id='wormholes'
          width={width}
          height={height}
        ></canvas>
      )}
      {visibleLayers.systems && (
        <canvas
          ref={systemsRef}
          className='galaxy_canvas_layer'
          id='systems'
          width={width}
          height={height}
        ></canvas>
      )}
      {visibleLayers.popups && (
        <canvas
          ref={popupsRef}
          className='galaxy_canvas_layer'
          id='popups'
          width={width}
          height={height}
        ></canvas>
      )}
    </Fragment>
  );
};

export default GalaxyCanvas;
