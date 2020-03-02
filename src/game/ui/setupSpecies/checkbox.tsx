import React from 'react';

import { TUiCheckbox } from './setup.species.types';

const UiCheckbox: React.FC<TUiCheckbox> = ({
  id,
  label,
  checked,
  disabled,
  onChange,
}) => {
  return (
    <div>
      <input
        type='checkbox'
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default UiCheckbox;
