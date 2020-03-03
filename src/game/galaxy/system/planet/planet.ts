import ID from '../../../../util/id';
import RandomNumber from '../../../../util/randomNumber';
import { TSpecies } from '../../species/species';
import Facilities from './facilities/facilities';

/** maximum planet abundance */
export const planetAbundanceMaximum = 12;

/** maximum planet size */
export const planetSizeMaximum = 8;

/** planet description */
export type TPlanet = {
  /** planet id */
  id: string;
  /** planet name */
  name: string;
  /** planet populated */
  populated: boolean;
  /** level of abundance */
  abundance: number;
  /** size of planet */
  size: number;
  /** planet gravity */
  gravity: number[];
  /** planet atmosphere */
  atmosphere: number[];
  /** planet temperature */
  temperature: number[];
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
  /** current planet occupants */
  species?: TSpecies;
};

/** planet options */
export type TPlanetOptions = Partial<TPlanet> | Planet;

/** planet data */
export default class Planet implements TPlanet {
  id: string;
  name: string;
  populated: boolean;
  abundance: number;
  size: number;
  gravity: number[];
  atmosphere: number[];
  temperature: number[];
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
  species?: TSpecies;

  constructor(options?: TPlanetOptions) {
    this.id = options?.id ?? ID();
    this.name = options?.name ?? ``;
    this.populated = options?.populated ?? false;
    this.abundance =
      options?.abundance ?? RandomNumber(planetAbundanceMaximum, 1);
    this.size = options?.size ?? RandomNumber(planetSizeMaximum, 1);
    this.gravity = options?.gravity ?? [];
    this.atmosphere = options?.atmosphere ?? [];
    this.temperature = options?.temperature ?? [];
    this.constructionPoints = options?.constructionPoints ?? 0;
    this.espionagePoints = options?.espionagePoints ?? 0;
    this.researchPoints = options?.researchPoints ?? 0;
    this.populationPoints = options?.populationPoints ?? 0;
    this.populationMaximumInitial =
      options?.populationMaximumInitial ?? this.calcPopulationMaximumInitial();
    this.populationMaximum =
      options?.populationMaximum ?? this.populationMaximumInitial;
    this.population = options?.population ?? 0;
    this.defensePointsMaximumInitial = 0;
    this.defensePointsMaximum = 0;
    this.defensePoints = 0;
    this.facilities = new Facilities(options?.facilities);
    this.species = options?.species;
  }

  calcPopulationMaximumInitial(): number {
    return Math.floor(this.size + this.size * (this.abundance / 10));
  }

  calcAtmosphereRate(): number {
    if (this.species) {
      return this.species.atmosphere
        .map(t => this.atmosphere.indexOf(t))
        .some(t => t !== -1)
        ? 1
        : 0;
    }
    return 0;
  }

  calcTemperatureRate(): number {
    if (this.species) {
      return this.temperature === this.species.temperature ? 1 : 0;
    }
    return 0;
  }

  calcPoints(rate: number): number {
    return (
      this.population *
      (1 + rate) *
      10 *
      this.abundance *
      ((this.calcTemperatureRate() + this.calcAtmosphereRate()) * 1.1)
    );
  }

  populate(species: TSpecies): void {
    this.species = species;
    this.populated = true;
    this.abundance = planetAbundanceMaximum;
    this.size = planetSizeMaximum;
    this.atmosphere = species.atmosphere;
    this.temperature = species.temperature;
    this.populationMaximumInitial = this.calcPopulationMaximumInitial();
    this.populationMaximum = this.populationMaximumInitial;
    this.population = Math.floor(this.populationMaximumInitial / 2);
    this.facilities.upgradeToColonyA();
    this.constructionPoints = this.calcPoints(
      this.facilities.constructionRate()
    );
    this.espionagePoints = this.calcPoints(this.facilities.espionageRate());
    this.populationPoints = this.calcPoints(this.facilities.populationRate());
    this.researchPoints = this.calcPoints(this.facilities.researchRate());
    // to be implemented
    this.defensePointsMaximumInitial = 0;
    // to be implemented
    this.defensePointsMaximum = 0;
    // to be implemented
    this.defensePoints = 0;
  }

  /** user colonizes the planet */
  colonize(): void {
    console.log('colonize planet');
  }
}
