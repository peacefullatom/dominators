import {
  atmosphereHydrogenHelium,
  atmosphereNitrogenCarbonDioxide,
  atmosphereNitrogenMethane,
  atmosphereNitrogenOxygen,
  atmosphereNone,
} from './atmosphere.const';

export type TAtmosphere =
  | typeof atmosphereNone
  | typeof atmosphereNitrogenOxygen
  | typeof atmosphereNitrogenCarbonDioxide
  | typeof atmosphereHydrogenHelium
  | typeof atmosphereNitrogenMethane;
