import './fleet.scss';

import React from 'react';

import UiGameLayout, { TUiGameLayout } from '../common/game.layout';
import UiGovernor from '../common/governor';

type TUiFleet = {} & TUiGameLayout;

const UiFleet: React.FC<TUiFleet> = ({ galaxy, action }) => {
  const table = <div className='table'></div>;
  const player = galaxy.species.find(s => s.player);
  let avatar = '';
  let skill = 0;
  if (player && player.leadOfConstruction) {
    const bio = player.leadOfConstruction.bioConstruction();
    avatar = bio.avatar;
    skill = bio.skill;
  }
  return (
    <UiGameLayout galaxy={galaxy} action={action}>
      <div className='fleet'>
        <div className='left'>
          <div className='ships shipyards'>
            <div className='header'>
              <button>ships</button>
              <button>shipyards</button>
            </div>
            {table}
          </div>
          <div className='governor'>
            <UiGovernor skill={skill} avatar={avatar}></UiGovernor>
          </div>
        </div>
        <div className='right'>
          <div className='details'></div>
        </div>
      </div>
    </UiGameLayout>
  );
};

export default UiFleet;
