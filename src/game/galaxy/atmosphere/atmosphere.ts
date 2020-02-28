import ID from '../../../util/id';
import RandomNumber from '../../../util/randomNumber';

/** sparse atmosphere */
export const atmosphereTypeVacuum = 0;
/** hydrogen and helium atmosphere */
export const atmosphereTypeHydrogenHelium = 1;
/** nitrogen and carbon dioxide atmosphere */
export const atmosphereTypeNitrogenCarbonDioxide = 2;
/** nitrogen and methane atmosphere */
export const atmosphereTypeNitrogenMethane = 3;
/** nitrogen and oxygen atmosphere (sol) */
export const atmosphereTypeNitrogenOxygen = 4;

/** list of atmosphere types */
export const atmosphereTypes = [
  atmosphereTypeVacuum,
  atmosphereTypeHydrogenHelium,
  atmosphereTypeNitrogenCarbonDioxide,
  atmosphereTypeNitrogenMethane,
  atmosphereTypeNitrogenOxygen,
];

/** atmosphere union type */
export type TAtmosphereType =
  | typeof atmosphereTypeVacuum
  | typeof atmosphereTypeHydrogenHelium
  | typeof atmosphereTypeNitrogenCarbonDioxide
  | typeof atmosphereTypeNitrogenMethane
  | typeof atmosphereTypeNitrogenOxygen;

/** atmosphere description */
export type TAtmosphere = {
  id: string;
  type: number[];
};

/** atmosphere options */
export type TAtmosphereOptions = Partial<TAtmosphere> | Atmosphere;

/** atmosphere data */
export default class Atmosphere implements TAtmosphere {
  id: string;
  type: number[];

  constructor(options?: TAtmosphereOptions) {
    this.id = options?.id ?? ID();
    this.type = this.generateAtmosphere(options?.type);
  }

  generateAtmosphere(options?: number[]): number[] {
    if (options instanceof Array && options.length) {
      return options;
    }
    return [...atmosphereTypes]
      .sort(() => (Math.random() >= 0.5 ? -1 : 1))
      .slice(0, RandomNumber(3, 1));
  }
}
