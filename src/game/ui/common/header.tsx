import './header.scss';

import React from 'react';

const UiCommonHeader: React.FC = ({ children }) => {
  return <div className='header'>{children}</div>;
};

export default UiCommonHeader;
