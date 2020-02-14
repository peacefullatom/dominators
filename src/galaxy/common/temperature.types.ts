import {
  temperatureCold,
  temperatureHot,
  temperatureNeutral,
  temperatureVeryCold,
  temperatureVeryHot,
} from './temperature.const';

export type TTemperatureType =
  | typeof temperatureVeryCold
  | typeof temperatureCold
  | typeof temperatureNeutral
  | typeof temperatureHot
  | typeof temperatureVeryHot;
