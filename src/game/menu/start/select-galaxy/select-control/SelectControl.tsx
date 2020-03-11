import './SelectControl.scss';

import { faMinusSquare as minusSquareEnabled, faPlusSquare as plusSquareEnabled } from '@fortawesome/free-regular-svg-icons';
import { faMinusSquare as minusSquareDisabled, faPlusSquare as plusSquareDisabled } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import ID from '../../../../../util/id';
import { TSelectControl } from './SelectControl.types';

const SelectControl: React.FC<TSelectControl> = ({
  min,
  max,
  value,
  values,
  label,
  update,
}) => {
  const mutate = (direction: -1 | 1): void =>
    update(values[values.indexOf(value) + direction]);
  const increaseDisabled = value === max;
  const decreaseDisabled = value === min;
  const increaseId = ID();
  const decreaseId = ID();

  return (
    <div className='select_control'>
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
      <div className='control_label'>{label}</div>
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

export default SelectControl;
