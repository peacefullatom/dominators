import './footer.with.version.scss';

import React from 'react';

import * as config from '../../../../package.json';
import UiCommonFooter from './footer';

const UiCommonFooterWithVersion: React.FC = () => {
  return (
    <UiCommonFooter className={'version'}>v. {config.version}</UiCommonFooter>
  );
};

export default UiCommonFooterWithVersion;
