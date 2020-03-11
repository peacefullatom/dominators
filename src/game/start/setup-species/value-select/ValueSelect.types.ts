export type TValueSelectValue = {
  value: number;
  label: string;
};

export type TValueSelect = {
  values: TValueSelectValue[];
  selection?: number;
  label: string;
  remainingPoints: number;
  update: (data: number, skill: string) => void;
};
