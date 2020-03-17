import './GalaxyCanvas.scss';

import React, { createRef, useEffect } from 'react';

import { TGalaxyCanvas } from './GalaxyCanvas.types';
import {
  galaxyCanvasCoordinate,
  galaxyCanvasHighlight,
  galaxyCanvasPopup,
  galaxyCanvasSystems,
  galaxyCanvasWormholes,
} from './GalaxyCanvas.utils';
import { useGalaxy } from './GalaxyContext';
import { TSystem } from './system/System.types';

const GalaxyCanvas: React.FC<TGalaxyCanvas> = ({
  interactive,
  width,
  height,
  layers,
}) => {
  const { galaxy, setGalaxy } = useGalaxy();
  const visibleLayers = layers ?? { systems: true };
  const settings = Object.keys(visibleLayers).map(id => ({
    id,
    ref: createRef<HTMLCanvasElement>(),
  }));

  const render = (): void => {
    window.requestAnimFrame(render);
    const systems = settings.find(s => s.id === 'systems');
    const wormholes = settings.find(s => s.id === 'wormholes');
    if (width && height) {
      if (systems?.ref.current) {
        galaxyCanvasSystems(
          systems.ref.current,
          width,
          height,
          galaxy.systems,
          interactive
        );
      }
      if (wormholes?.ref.current) {
        galaxyCanvasWormholes(
          wormholes.ref.current,
          width,
          height,
          galaxy.systems
        );
      }
    }
  };

  render();

  const highlight = (system: TSystem): void => {
    setGalaxy({
      ...galaxy,
      systems: galaxy.systems.map(s => ({
        ...s,
        coordinates: { ...s.coordinates, active: system.id === s.id },
      })),
    });
  };

  const dim = (): void => {
    setGalaxy({
      ...galaxy,
      systems: galaxy.systems.map(s => ({
        ...s,
        coordinates: { ...s.coordinates, active: false },
      })),
    });
  };

  useEffect(() => {
    const controls = settings.find(s => s.id === 'controls');
    const popups = settings.find(s => s.id === 'popups');
    const focus = galaxy.systems.find(s => s.coordinates.active);
    if (width && height) {
      if (controls?.ref.current) {
        galaxyCanvasHighlight(controls.ref.current, width, height, focus);
      }
      if (popups?.ref.current) {
        galaxyCanvasPopup(popups.ref.current, width, height, focus);
      }
    }
  }, [galaxy, width, height]);

  return (
    <div className='galaxy_canvas_container'>
      {settings.map((s, i) => (
        <canvas
          key={i}
          ref={s.ref}
          id={s.id}
          className='galaxy_canvas_layer'
          width={width}
          height={height}
        ></canvas>
      ))}
      <div className='galaxy_canvas_controls'>
        {galaxy.systems.map((s, i) => {
          const player = s.species.find(e => e.data.player);
          return (
            <div
              key={i}
              className={`canvas_control ${player?.discovered ? 'active' : ''}`}
              style={{
                left: galaxyCanvasCoordinate(s.coordinates.x, width),
                top: galaxyCanvasCoordinate(s.coordinates.y, height),
              }}
              onMouseEnter={(): void => highlight(s)}
              onMouseLeave={(): void => dim()}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default GalaxyCanvas;
