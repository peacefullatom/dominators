import ID from '../../../../../util/id';

/** undefined facility type */
export const facilityTypeNotSet = 0;
/** construction facility type */
export const facilityTypeConstruction = 1;
/** espionage facility type */
export const facilityTypeEspionage = 2;
/** population facility type */
export const facilityTypePopulation = 3;
/** research facility type */
export const facilityTypeResearch = 4;

/** facilities union type */
export type TFacilityType =
  | typeof facilityTypeNotSet
  | typeof facilityTypeConstruction
  | typeof facilityTypeEspionage
  | typeof facilityTypePopulation
  | typeof facilityTypeResearch;

/** default facility rate */
export const facilityRateDefault = 0.1;
/** facility rate 0.1 */
export const facilityRate1 = facilityRateDefault;
/** facility rate 0.2 */
export const facilityRate2 = facilityRate1 + facilityRate1;
/** facility rate 0.3 */
export const facilityRate3 = facilityRate1 + facilityRate2;
/** facility rate 0.5 */
export const facilityRate4 = facilityRate2 + facilityRate3;
/** facility rate 0.8 */
export const facilityRate5 = facilityRate3 + facilityRate4;
/** facility rate 1.3 */
export const facilityRate6 = facilityRate4 + facilityRate5;
/** facility rate 2.1 */
export const facilityRate7 = facilityRate5 + facilityRate6;

/** list of facilities rates */
export const facilityRates = [
  facilityRateDefault,
  facilityRate1,
  facilityRate2,
  facilityRate3,
  facilityRate4,
  facilityRate5,
  facilityRate6,
  facilityRate7,
];

/** base facility cost */
export const facilityCostDefault = 1e3;
/** facility cost multiplier */
export const facilityCostRate = 1e4;

/** initial operation level */
export const facilityOperationLevelDefault = 0;
/** maximum operation level */
export const facilityOperationLevelMaximum = 100;

/** facility description */
export type TFacility = {
  /** facility id */
  id: string;
  /** facility name */
  name: string;
  /** facility type */
  type: TFacilityType;
  /** facility points production rate */
  rate: number;
  /** level of readiness from 0 to 100 */
  operationLevel: number;
  /** construction cost in construction points */
  cost: number;
};

/** facility options */
export type TFacilityOptions = Partial<TFacility> | Facility;

/** facility data */
export default class Facility implements TFacility {
  id: string;
  name: string;
  type: TFacilityType;
  rate: number;
  operationLevel: number;
  cost: number;

  constructor(options?: TFacilityOptions) {
    this.id = options?.id ?? ID();
    this.name = options?.name ?? ``;
    this.type = options?.type ?? facilityTypeNotSet;
    this.rate = options?.rate ?? facilityRateDefault;
    this.operationLevel =
      options?.operationLevel ?? facilityOperationLevelDefault;
    this.cost = options?.cost ?? facilityCostDefault;
  }
}
