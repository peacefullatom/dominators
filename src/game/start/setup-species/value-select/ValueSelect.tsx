import './ValueSelect.scss';

import { faMinusSquare as minusSquareEnabled, faPlusSquare as plusSquareEnabled } from '@fortawesome/free-regular-svg-icons';
import { faMinusSquare as minusSquareDisabled, faPlusSquare as plusSquareDisabled } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { skillTypes, skillTypeVeryHigh, skillTypeVeryLow } from '../../../../data/skill/skill';
import ID from '../../../../util/id';
import { TValueSelect } from './ValueSelect.types';

const ValueSelect: React.FC<TValueSelect> = ({
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
    remainingPoints - skillTypes.indexOf(selection ?? 0) < 0;
  const mutate = (direction: -1 | 1): void => {
    update(skillTypes[skillTypes.indexOf(selection ?? 0) + direction], label);
  };
  const increaseId = ID();
  const decreaseId = ID();

  return (
    <div className='value_select'>
      <button
        disabled={decreaseDisabled}
        onClick={(): void => mutate(-1)}
        id={decreaseId}
      />
      <label
        htmlFor={decreaseId}
        className={decreaseDisabled ? 'disabled' : ''}
      >
        <FontAwesomeIcon
          icon={decreaseDisabled ? minusSquareDisabled : minusSquareEnabled}
        />
      </label>
      <div className='select_description'>
        {label} rate {value}
      </div>
      <button
        disabled={increaseDisabled}
        onClick={(): void => mutate(1)}
        id={increaseId}
      />
      <label
        htmlFor={increaseId}
        className={increaseDisabled ? 'disabled' : ''}
      >
        <FontAwesomeIcon
          icon={increaseDisabled ? plusSquareDisabled : plusSquareEnabled}
        />
      </label>
    </div>
  );
};

export default ValueSelect;
