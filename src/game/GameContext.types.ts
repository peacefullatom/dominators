export type TGameContext = {
  view: string;
  setView: (view: string) => void;
};

export type TGameProvider = {
  children?: React.ReactNode;
  view?: string;
};
