import { ioGameStorage } from './io.const';

const ioLoad = <T>(): T | undefined => {
  const data = localStorage.getItem(ioGameStorage);
  if (data) {
    return JSON.parse(data);
  }
  return undefined;
};

const ioSave = <T>(value: T): boolean => {
  const data = JSON.stringify(value);
  localStorage.setItem(ioGameStorage, data);
  return true;
};

export { ioLoad, ioSave };
