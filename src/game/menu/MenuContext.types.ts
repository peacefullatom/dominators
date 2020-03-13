import { ReactNode } from 'react';

export type TMenuContext = {
  view: string;
  setView: (view: string) => void;
};

export type TMenuProvider = {
  children?: ReactNode;
  view?: string;
};
