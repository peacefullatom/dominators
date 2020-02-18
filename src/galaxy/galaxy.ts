import ID from '../util/id';
import Species from './species/species';
import System from './system/system';

export type TGalaxy = {
  id: string;
  systemsCount: number;
  systems: System[];
  speciesCount: number;
  species: Species[];
};

export type TGalaxyOptions = Partial<TGalaxy> | Galaxy;

export default class Galaxy implements TGalaxy {
  id: string;
  systemsCount: number;
  systems: System[];
  speciesCount: number;
  species: Species[];

  constructor(options?: TGalaxyOptions) {
    this.id = options?.id ?? ID();
    this.systemsCount = options?.systemsCount ?? 10;
    this.systems = this.generateSystems(options?.systems);
    this.speciesCount = options?.speciesCount ?? 3;
    this.species = this.generateSpecies(options?.species);
  }

  generateSystems(options?: System[]): System[] {
    if (options instanceof Array && options.length) {
      return options.map(source => new System(source));
    }
    return Array.from({ length: this.systemsCount }, () => new System());
  }

  generateSpecies(options?: Species[]): Species[] {
    if (options instanceof Array && options.length) {
      return options.map(source => new Species(source));
    }
    return Array.from({ length: this.speciesCount }, () => new Species());
  }
}
