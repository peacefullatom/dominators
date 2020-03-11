export type TSelectControl = {
  min: number;
  max: number;
  value: number;
  values: number[];
  label: string;
  update: (value: number) => void;
};
