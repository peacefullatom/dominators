import './Galaxy.scss';

import React, { useRef } from 'react';

import useElementDimensions from '../../hook/useElementDimensions';
import { TGalaxy } from './Galaxy.types';
import GalaxyCanvas from './GalaxyCanvas';
import { TGalaxyCanvasLayers } from './GalaxyCanvas.types';

const Galaxy: React.FC<TGalaxy> = ({ interactive }) => {
  const galaxyRef = useRef<HTMLDivElement>(null);
  const dimensions = useElementDimensions(galaxyRef);
  const layers: TGalaxyCanvasLayers = interactive
    ? {
        background: true,
        wormholes: true,
        systems: true,
        popups: true,
      }
    : { systems: true };

  return (
    <div ref={galaxyRef} className='galaxy'>
      <GalaxyCanvas
        layers={layers}
        width={dimensions?.width ?? 0}
        height={dimensions?.height ?? 0}
      />
    </div>
  );
};

export default Galaxy;
