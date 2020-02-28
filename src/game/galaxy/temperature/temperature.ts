import ID from '../../util/id';
import RandomValue from '../../util/randomValue';

/** sparse temperature */
export const temperatureTypeVeryCold = 0;
/** hydrogen and helium temperature */
export const temperatureTypeCold = 1;
/** nitrogen and carbon dioxide temperature */
export const temperatureTypeNeutral = 2;
/** nitrogen and methane temperature */
export const temperatureTypeHot = 3;
/** nitrogen and oxygen temperature (sol) */
export const temperatureTypeVeryHot = 4;

/** list of temperature types */
export const temperatureTypes = [
  temperatureTypeVeryCold,
  temperatureTypeCold,
  temperatureTypeNeutral,
  temperatureTypeHot,
  temperatureTypeVeryHot,
];

/** temperature union type */
export type TTemperatureType =
  | typeof temperatureTypeVeryCold
  | typeof temperatureTypeCold
  | typeof temperatureTypeNeutral
  | typeof temperatureTypeHot
  | typeof temperatureTypeVeryHot;

/** temperature description */
export type TTemperature = {
  id: string;
  type: number;
};

/** temperature options */
export type TTemperatureOptions = Partial<TTemperature> | Temperature;

/** temperature data */
export default class Temperature implements TTemperature {
  id: string;
  type: number;

  constructor(options?: TTemperatureOptions) {
    this.id = options?.id ?? ID();
    this.type = this.generateTemperature(options?.type);
  }

  generateTemperature(options?: number): number {
    if (typeof options === 'number') {
      return options;
    }
    return RandomValue(temperatureTypes);
  }
}
