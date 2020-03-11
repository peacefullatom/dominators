export type TMultiSelectValue = {
  value: number;
  label: string;
  selected: boolean;
};

export type TMultiSelect = {
  values: TMultiSelectValue[];
  factor?: boolean;
  factorName: string;
  remainingPoints: number;
  update: (data: Partial<TMultiSelect>) => void;
};
