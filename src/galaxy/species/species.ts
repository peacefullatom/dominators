import ID from '../../util/id';
import Atmosphere from '../atmosphere/atmosphere';
import Temperature from '../temperature/temperature';

export type TSpecies = {
  id: string;
  name: string;
  flag: string;
  atmosphere: Atmosphere;
  temperature: Temperature;
};

export type TSpeciesOptions = Partial<TSpecies> | Species;

export default class Species implements TSpecies {
  id: string;
  name: string;
  flag: string;
  atmosphere: Atmosphere;
  temperature: Temperature;

  constructor(options?: TSpeciesOptions) {
    this.id = options?.id ?? ID();
    this.name = options?.name ?? ``;
    this.flag = options?.flag ?? ``;
    this.atmosphere = new Atmosphere(options?.atmosphere);
    this.temperature = new Temperature(options?.temperature);
  }
}
