import { TEntity } from '../../types';

/** generate data from source */
const GenerateEntities = <T>(
  type: TEntity<T>,
  length: number,
  options?: T[]
): T[] => {
  if (options instanceof Array && options.length) {
    return options.map(source => new type(source));
  }
  return Array.from({ length }, () => new type());
};

export default GenerateEntities;
