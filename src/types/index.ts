export type TEntity<T> = { new (options?: T): T };

export type TPoint = {
  x: number;
  y: number;
};
