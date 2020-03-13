import { ReactNode } from 'react';

export type TStartContext = {
  view: string;
  setView: (view: string) => void;
};

export type TStartProvider = {
  children?: ReactNode;
  view?: string;
};
