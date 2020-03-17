import './System.scss';

import React, { useRef } from 'react';

import useElementDimensions from '../../../hook/useElementDimensions';
import { TSystem } from './System.types';
import SystemCanvas from './SystemCanvas';

const System: React.FC<TSystem> = props => {
  const systemPlanetsRef = useRef<HTMLDivElement>(null);
  const dimensions = useElementDimensions(systemPlanetsRef);
  console.log(props);

  return (
    <div className='system'>
      <div className='system_details'>
        <div className='details_name'>{props.name}</div>
        <div className='details_planets'>
          {props.planets.map((p, i) => {
            return (
              <div key={i} className='planet_block'>
                <div className='block_icon'></div>
                <div className='block_data'>
                  <div className='data_name'>{p.name}</div>
                  <div className='data_habitability'>{p.orbit}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className='details_governor'></div>
      </div>
      <div className='system_overview'>
        <div ref={systemPlanetsRef} className='system_planets'>
          <SystemCanvas
            width={dimensions?.width ?? 0}
            height={dimensions?.height ?? 0}
            planets={props.planets}
            wormholes={props.wormholes}
          />
        </div>
        <div className='system_controls'></div>
      </div>
    </div>
  );
};

export default System;
