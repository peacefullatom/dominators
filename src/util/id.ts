import { idSource } from './id.const';

const ID = (): string => {
  const id: string[] = [];
  const template = idSource
    .split('')
    .sort(() => (Math.random() > 0.5 ? -1 : +1));

  for (let i = 0; i < 6; i++) {
    const position = Math.floor(Math.random() * template.length);
    id.push(template[position]);
  }

  return id.join('');
};

export default ID;
