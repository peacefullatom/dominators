export type TEntity<T> = { new (options?: T): T };

export type TPoint = {
  x: number;
  y: number;
};

/** vertical and horizontal */
export type TPaddingVH = [number, number];
/** top, horizontal, and bottom */
export type TPaddingTHB = [number, number, number];
/** top, right, bottom, and left */
export type TPaddingTRBL = [number, number, number, number];
/** padding is mirroring CSS rule */
export type TPadding = number | TPaddingVH | TPaddingTHB | TPaddingTRBL;
/** normalized padding */
export type TPaddingNormal = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type TAction = () => void;
