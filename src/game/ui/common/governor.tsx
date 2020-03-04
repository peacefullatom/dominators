import './governor.scss';

import React from 'react';

type TUiGovernor = {
  skill: number;
  avatar: string;
};

const UiGovernor: React.FC<TUiGovernor> = ({ skill, avatar }) => {
  return (
    <div className='avatar' style={{ background: avatar }}>
      <div className='skill'>{skill}</div>
    </div>
  );
};

export default UiGovernor;
