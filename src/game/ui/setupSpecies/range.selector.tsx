import React from 'react';

import { skillTypes, skillTypeVeryHigh, skillTypeVeryLow } from '../../galaxy/skill/skill';
import { TUiRangeSelector } from './setup.species.types';

const UiRangeSelector: React.FC<TUiRangeSelector> = ({
  values,
  selection,
  label,
  remainingPoints,
  update,
}) => {
  const value = values.find(v => v.value === selection)?.label ?? `NaN`;
  const decreaseDisabled = selection === skillTypeVeryLow;
  const increaseDisabled =
    selection === skillTypeVeryHigh ||
    remainingPoints - skillTypes.indexOf(selection) < 0;
  const mutate = (direction: -1 | 1): void => {
    update(skillTypes[skillTypes.indexOf(selection) + direction], label);
  };
  return (
    <div className='range selector'>
      <button disabled={decreaseDisabled} onClick={(): void => mutate(-1)}>
        -
      </button>
      <div>
        {label} rate {value}
      </div>
      <button disabled={increaseDisabled} onClick={(): void => mutate(1)}>
        +
      </button>
    </div>
  );
};

export default UiRangeSelector;
