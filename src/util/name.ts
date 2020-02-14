import ID from './id';
import RandomValue from './randomValue';

const Name = (list?: string[]): string => {
  if (list instanceof Array && list.length) {
    return RandomValue(list);
  }
  return ID();
};

export default Name;
