import './MultiSelectCheckbox.scss';

import { faCheckSquare as checkSquareEnabled, faSquare as squareEnabled } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare as checkSquareDisabled, faSquare as squareDisabled } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import ID from '../../../../../util/id';
import { TMultiSelectCheckbox } from './MultiSelectCheckbox.types';

const MultiSelectCheckbox: React.FC<TMultiSelectCheckbox> = ({
  label,
  checked,
  disabled,
  onChange,
}) => {
  const id = ID();
  return (
    <div className='multi_select_checkbox'>
      <input
        type='checkbox'
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={id} className={disabled ? 'disabled' : ''}>
        {!!checked && (
          <FontAwesomeIcon
            icon={disabled ? checkSquareDisabled : checkSquareEnabled}
          />
        )}
        {!checked && (
          <FontAwesomeIcon icon={disabled ? squareDisabled : squareEnabled} />
        )}{' '}
        {label}
      </label>
    </div>
  );
};

export default MultiSelectCheckbox;
