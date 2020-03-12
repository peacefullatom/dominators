import './Spinner.scss';

import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className='spinner'>
      <div className='spinner_gear'>
        <FontAwesomeIcon icon={faCog} />
      </div>
    </div>
  );
};

export default Spinner;
