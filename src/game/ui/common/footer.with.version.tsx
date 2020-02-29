import React from 'react';

import * as config from '../../../../package.json';
import UiCommonFooter from './footer';

const UiCommonFooterWithVersion: React.FC = () => {
  return <UiCommonFooter>v. {config.version}</UiCommonFooter>;
};

export default UiCommonFooterWithVersion;
