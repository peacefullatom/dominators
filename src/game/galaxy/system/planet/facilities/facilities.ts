import Facility, {
  facilityCostDefault,
  facilityOperationLevelDefault,
  facilityOperationLevelMaximum,
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

/** facilities available for level A colony */
export const facilitiesColonyA = 0;
/** facilities available for level B colony */
export const facilitiesColonyB = 1;
/** facilities available for level C colony */
export const facilitiesColonyC = 2;

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
      cost: Math.floor(level * (facilityCostDefault + 1e6 * rate)),
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
    if (options instanceof Array && options.length === facilitiesCount) {
      return options.map(source => new Facility(source));
    }
    return this.generateFacilitiesList(type);
  }

  upgradeToColony(colonyLevel: number): void {
    this.construction[
      colonyLevel
    ].operationLevel = facilityOperationLevelMaximum;
    this.espionage[colonyLevel].operationLevel = facilityOperationLevelMaximum;
    this.population[colonyLevel].operationLevel = facilityOperationLevelMaximum;
    this.research[colonyLevel].operationLevel = facilityOperationLevelMaximum;
  }

  upgradeToColonyA(): void {
    this.upgradeToColony(facilitiesColonyA);
  }

  upgradeToColonyB(): void {
    this.upgradeToColonyA();
    this.upgradeToColony(facilitiesColonyB);
  }

  upgradeToColonyC(): void {
    this.upgradeToColonyA();
    this.upgradeToColonyB();
    this.upgradeToColony(facilitiesColonyC);
  }

  calcRate(data: Facility[]): number {
    return data
      .filter(f => f.operationLevel)
      .map(f => (f.operationLevel * f.rate) / 100)
      .reduce((t, n) => t + n);
  }

  constructionRate(): number {
    return this.calcRate(this.construction);
  }

  espionageRate(): number {
    return this.calcRate(this.espionage);
  }

  populationRate(): number {
    return this.calcRate(this.population);
  }

  researchRate(): number {
    return this.calcRate(this.research);
  }
}
