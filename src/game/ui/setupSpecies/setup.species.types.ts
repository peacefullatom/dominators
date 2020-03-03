export type TSkillName =
  | 'construction'
  | 'espionage'
  | 'fleet'
  | 'population'
  | 'research';

export type TUiRangeSelectorValue = {
  value: number;
  label: string;
};

export type TUiRangeSelector = {
  values: TUiRangeSelectorValue[];
  selection: number;
  label: TSkillName;
  remainingPoints: number;
  update: (data: number, skill: TSkillName) => void;
};

export type TUiCheckbox = {
  id: string;
  label: string;
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
};

export type TUiControlMultipleResult = {
  gravitation?: Partial<TUiControlMultiple>;
  atmosphere?: Partial<TUiControlMultiple>;
  temperature?: Partial<TUiControlMultiple>;
};

type TUiControlMultipleValue = {
  value: number;
  label: string;
  selected: boolean;
};

export type TUiControlMultiple = {
  values: TUiControlMultipleValue[];
  factor: boolean;
  factorName: string;
  remainingPoints: number;
  update: (data: Partial<TUiControlMultiple>) => void;
};
