import './MultiSelect.scss';

import React from 'react';

import MultiSelectCheckbox from './multi-select-checkbox/MultiSelectCheckbox';
import { TMultiSelect } from './MultiSelect.types';

const MultiSelect: React.FC<TMultiSelect> = ({
  values,
  factor,
  factorName,
  remainingPoints,
  update,
}) => {
  const uniqueSelection =
    values.filter(v => v.selected).length === 1 && !factor;
  const notEnoughPoints =
    remainingPoints - (values.filter(v => v.selected).length * 2 - 1) < 0;
  const notEnoughFactorPoints = remainingPoints - values.length * 2 - 1 < 0;

  return (
    <div className='control multiple'>
      {values.map((v, i) => {
        const disabled = factor || (!v.selected && notEnoughPoints);
        return (
          <MultiSelectCheckbox
            key={i}
            label={v.label}
            checked={v.selected}
            disabled={disabled || (uniqueSelection && v.selected)}
            onChange={(): void => {
              values[i].selected = !v.selected;
              update({ values, factor });
            }}
          />
        );
      })}
      <MultiSelectCheckbox
        label={factorName}
        checked={!!factor}
        disabled={!factor && notEnoughFactorPoints}
        onChange={(): void => update({ values, factor: !factor })}
      />
    </div>
  );
};

export default MultiSelect;
