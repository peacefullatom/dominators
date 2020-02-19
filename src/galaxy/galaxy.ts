import ID from '../util/id';
import Species, { speciesRelationsTypeNeutral } from './species/species';
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
    this.setup();
  }

  findUnpopulatedSystem(): System {
    const lookout = (data: System[]): System => {
      const index = Math.floor(Math.random() * data.length);
      const s = data[index];
      if (data.length && s.populated) {
        data.splice(index, 1);
        return lookout(data);
      }
      return s;
    };

    return lookout([...this.systems]);
  }

  setup(): void {
    this.species.forEach(s => {
      const system = this.findUnpopulatedSystem();
      system.populate(s);
    });
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
    const species = Array.from(
      { length: this.speciesCount },
      () => new Species()
    );
    species.forEach(s => {
      species.forEach(d => {
        if (s.id !== d.id) {
          s.relations[d.id] = {
            activities: { research: false, routeSharing: false, trade: false },
            relations: speciesRelationsTypeNeutral,
          };
        }
      });
    });
    return species;
  }
}
