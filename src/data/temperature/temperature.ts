/** very cold temperature */
export const temperatureTypeVeryCold = 1;
/** cold temperature */
export const temperatureTypeCold = 2;
/** neutral temperature (sol) */
export const temperatureTypeNeutral = 3;
/** hot temperature */
export const temperatureTypeHot = 4;
/** very hot temperature */
export const temperatureTypeVeryHot = 5;

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
