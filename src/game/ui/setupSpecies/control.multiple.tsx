import React from 'react';

import ID from '../../../util/id';
import UiCheckbox from './checkbox';
import { TUiControlMultiple } from './setup.species.types';

const UiControlMultiple: React.FC<TUiControlMultiple> = ({
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
          <UiCheckbox
            key={i}
            id={ID()}
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
      <UiCheckbox
        id={ID()}
        label={factorName}
        checked={factor}
        disabled={!factor && notEnoughFactorPoints}
        onChange={(): void => update({ values, factor: !factor })}
      />
    </div>
  );
};

export default UiControlMultiple;
