import { ReactNode } from 'react';

export type TCommandCenterContext = {
  view: string;
  setView: (view: string) => void;
  mode: number;
  setMode: (mode: number) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  showNews: boolean;
  setShowNews: (state: boolean) => void;
  feed: string[];
  setFeed: (data: string) => void;
};

export type TCommandCenterProvider = {
  children?: ReactNode;
  view?: string;
  mode?: number;
  speed?: number;
};
