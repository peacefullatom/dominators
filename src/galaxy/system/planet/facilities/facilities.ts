import Facility, {
  facilityCostDefault,
  facilityOperationLevelDefault,
  facilityRates,
  facilityTypeConstruction,
  facilityTypeEspionage,
  facilityTypePopulation,
  facilityTypeResearch,
  TFacility,
  TFacilityOptions,
  TFacilityType,
} from './facility/facility';

/** maximum amount of facilities of any type */
export const facilitiesCount = 8;

/** facilities structure */
export type TFacilities = {
  /** list of construction facilities */
  construction: Facility[];
  /** list of espionage facilities */
  espionage: Facility[];
  /** list of population facilities */
  population: Facility[];
  /** list of research facilities */
  research: Facility[];
};

/** facilities options */
export type TFacilitiesOptions = Partial<TFacilities> | Facilities;

/** facilities data */
export default class Facilities implements TFacilities {
  construction: Facility[];
  espionage: Facility[];
  population: Facility[];
  research: Facility[];

  constructor(options?: TFacilitiesOptions) {
    this.construction = this.generateFacilities(
      facilityTypeConstruction,
      options?.construction
    );
    this.espionage = this.generateFacilities(
      facilityTypeEspionage,
      options?.espionage
    );
    this.population = this.generateFacilities(
      facilityTypePopulation,
      options?.population
    );
    this.research = this.generateFacilities(
      facilityTypeResearch,
      options?.research
    );
  }

  /** get facility name by type */
  facilityType(type: TFacilityType): string {
    if (type === facilityTypeConstruction) {
      return `construction`;
    }
    if (type === facilityTypeEspionage) {
      return `espionage`;
    }
    if (type === facilityTypePopulation) {
      return `population`;
    }
    if (type === facilityTypeResearch) {
      return `research`;
    }
    return `unknown`;
  }

  /** get facility settings */
  facilitySettings(
    level: number,
    rate: number,
    type: TFacilityType
  ): TFacilityOptions {
    return {
      name: `${level} level ${this.facilityType(type)}`,
      type: type,
      rate: rate,
      operationLevel: facilityOperationLevelDefault,
      cost: Math.floor(level * (facilityCostDefault + 1e4 * rate)),
    };
  }

  /** generate default facilities list */
  generateFacilitiesList(type: TFacilityType): Facility[] {
    return Array.from(
      { length: facilitiesCount },
      (value, index) =>
        new Facility(this.facilitySettings(index, facilityRates[index], type))
    );
  }

  /** restore facilities list from options or generate default list */
  generateFacilities(type: TFacilityType, options?: TFacility[]): Facility[] {
    if (options instanceof Array && options.length === 8) {
      return options.map(source => new Facility(source));
    }
    return this.generateFacilitiesList(type);
  }
}
