import ID from '../util/id';
import System from './system/system';

export type TGalaxy = {
  id: string;
  systemsCount: number;
  systems: System[];
};

export type TGalaxyOptions = Partial<TGalaxy> | Galaxy;

export default class Galaxy implements TGalaxy {
  id: string;
  systemsCount: number;
  systems: System[];

  constructor(options?: TGalaxyOptions) {
    this.id = options?.id ?? ID();
    this.systemsCount = options?.systemsCount ?? 10;
    this.systems = this.generateSystems();
  }

  generateSystems(options?: TGalaxyOptions): System[] {
    if (options && options.systems && options.systems.length) {
      return options.systems.map(source => new System(source));
    }
    return Array.from({ length: this.systemsCount }, () => new System());
  }
}
