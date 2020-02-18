import ID from '../../../util/id';
import RandomNumber from '../../../util/randomNumber';
import Atmosphere from '../../atmosphere/atmosphere';
import Temperature from '../../temperature/temperature';
import Facilities from './facilities/facilities';

/** planet description */
export type TPlanet = {
  /** planet id */
  id: string;
  /** level of abundance */
  abundance: number;
  /** size of planet */
  size: number;
  /** planet atmosphere */
  atmosphere: Atmosphere;
  /** planet temperature */
  temperature: Temperature;
  /** amount of construction points generated per cycle */
  constructionPoints: number;
  /** amount of espionage points generated per cycle */
  espionagePoints: number;
  /** amount of research points generated per cycle */
  researchPoints: number;
  /** amount of population produced per cycle */
  populationPoints: number;
  /** initial maximum population */
  populationMaximumInitial: number;
  /** maximum population */
  populationMaximum: number;
  /** current population of the planet */
  population: number;
  /** initial maximum defense points */
  defensePointsMaximumInitial: number;
  /** current maximum defense points */
  defensePointsMaximum: number;
  /** defense points produced per cycle */
  defensePoints: number;
  /** list of facilities */
  facilities: Facilities;
};

/** planet options */
export type TPlanetOptions = Partial<TPlanet> | Planet;

/** planet data */
export default class Planet implements TPlanet {
  id: string;
  abundance: number;
  size: number;
  atmosphere: Atmosphere;
  temperature: Temperature;
  constructionPoints: number;
  espionagePoints: number;
  researchPoints: number;
  populationPoints: number;
  populationMaximumInitial: number;
  populationMaximum: number;
  population: number;
  defensePointsMaximumInitial: number;
  defensePointsMaximum: number;
  defensePoints: number;
  facilities: Facilities;

  constructor(options?: TPlanetOptions) {
    this.id = options?.id ?? ID();
    this.abundance = options?.abundance ?? RandomNumber(12, 1);
    this.size = options?.size ?? RandomNumber(7, 1);
    this.atmosphere = new Atmosphere(options?.atmosphere);
    this.temperature = new Temperature(options?.temperature);
    this.constructionPoints = options?.constructionPoints ?? 0;
    this.espionagePoints = options?.espionagePoints ?? 0;
    this.researchPoints = options?.researchPoints ?? 0;
    this.populationPoints = options?.populationPoints ?? 0;
    this.populationMaximumInitial =
      options?.populationMaximumInitial ??
      Math.floor(this.size + this.size * (this.abundance / 10));
    this.populationMaximum =
      options?.populationMaximum ?? this.populationMaximumInitial;
    this.population = options?.population ?? 0;
    this.defensePointsMaximumInitial = 0;
    this.defensePointsMaximum = 0;
    this.defensePoints = 0;
    this.facilities = new Facilities(options?.facilities);
  }
}
