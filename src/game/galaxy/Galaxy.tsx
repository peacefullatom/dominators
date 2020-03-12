import './Galaxy.scss';

import React, { useRef } from 'react';

import useElementDimensions from '../../hook/useElementDimensions';
import GalaxyCanvas from './GalaxyCanvas';

const Galaxy: React.FC = () => {
  const galaxyRef = useRef<HTMLDivElement>(null);
  const dimensions = useElementDimensions(galaxyRef);

  return (
    <div ref={galaxyRef} className='galaxy'>
      <GalaxyCanvas
        width={dimensions?.width ?? 0}
        height={dimensions?.height ?? 0}
      />
    </div>
  );
};

export default Galaxy;
