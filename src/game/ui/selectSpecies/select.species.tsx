import './select.species.scss';

import React from 'react';

import UiCommonFooter from '../common/footer';
import UiCommonHeaderWithHomeButtonAndLabel from '../common/header.with.home.button.and.label';

type TUiSelectSpecies = {
  home: () => void;
};

const UiSelectSpecies: React.FC<TUiSelectSpecies> = ({ home }) => {
  return (
    <div>
      <UiCommonHeaderWithHomeButtonAndLabel
        home={home}
        label={'Select species'}
      ></UiCommonHeaderWithHomeButtonAndLabel>
      <UiCommonFooter></UiCommonFooter>
    </div>
  );
};

export default UiSelectSpecies;
