import './footer.scss';

import React from 'react';

type TUiCommonFooter = {
  className?: string;
};

const UiCommonFooter: React.FC<TUiCommonFooter> = ({ children, className }) => {
  return <div className={`footer ${className}`}>{children}</div>;
};

export default UiCommonFooter;
