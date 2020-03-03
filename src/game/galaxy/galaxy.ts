import { TPoint } from '../../types';
import ID from '../../util/id';
import CreateDistributedPoints from '../../util/poisson';
import RandomNumber from '../../util/randomNumber';
import RandomValue from '../../util/randomValue';
import GalaxyCanvas, { TGalaxyCanvasOptions } from './galaxy.canvas';
import { galaxyDensityMedium } from './galaxy.const';
import { TSpecies } from './species/species';
import System, { TSystem } from './system/system';

/** galaxy description */
export type TGalaxy = {
  /** galaxy id */
  id: string;
  /** galaxy name */
  name: string;
  /** density of the galaxy */
  density: number;
  /** list of habitable star systems */
  systems: TSystem[];
  /** adjacent list of wormholes */
  wormholes: TPoint[][];
  /** initial galaxy's systems seed */
  matrix: TPoint[];
  /** list of habitants */
  species: TSpecies[];
  /** number of opponents */
  speciesCount: number;
};

export type TGalaxyOptions = (Partial<TGalaxy> | TGalaxy) &
  TGalaxyCanvasOptions;

export default class Galaxy implements TGalaxy {
  id: string;
  name: string;
  density: number;
  systems: TSystem[];
  wormholes: TPoint[][];
  matrix: TPoint[];
  species: TSpecies[];
  speciesCount: number;
  /** galaxy representation */
  canvas: GalaxyCanvas;

  constructor(options?: TGalaxyOptions) {
    this.id = options?.id ?? ID();
    this.name = options?.name ?? ``;
    this.density = options?.density ?? galaxyDensityMedium;
    this.systems = options?.systems ?? [];
    this.wormholes = options?.wormholes ?? [];
    this.matrix = options?.matrix ?? [];
    this.species = options?.species ?? [];
    this.speciesCount = options?.speciesCount ?? 3;
    this.canvas = new GalaxyCanvas(options);
  }

  setup(parent: HTMLElement, matrix?: TPoint[]): void {
    this.canvas.setup(parent);
    this.generate(matrix);
    this.canvas.show(this.systems, { systems: true });
  }

  /** link systems */
  linkSystems(systems: TSystem[]): void {
    const orphans = systems.filter(o => !o.wormholes.length);
    if (orphans.length) {
      const list = systems.filter(s => s.wormholes.length);
      const sources = list.length ? list : [RandomValue(systems)];
      const destinations = systems.filter(s => !s.wormholes.length);

      const pairs = sources
        .map(s => {
          const d = destinations
            .filter(d => d.id !== s.id)
            .map(d => ({
              d,
              r: Math.hypot(
                s.coordinates.x - d.coordinates.x,
                s.coordinates.y - d.coordinates.y
              ),
            }))
            .sort((a, b) => a.r - b.r)
            .shift();
          return { s, d: d?.d, r: d?.r };
        })
        .sort((a, b) => (a?.r ?? 0) - (b?.r ?? 0))
        .slice(0, RandomNumber(3));

      pairs.forEach(p => {
        const { s, d } = p;
        if (d) {
          s.wormholes.push(d.id);
          d.wormholes.push(s.id);
        }
      });

      if (orphans.length) {
        this.linkSystems(systems);
      }
    }
  }

  /** seed new galaxy */
  seed(): TPoint[] {
    // MAGIC NUMBERS
    const xMin = 1;
    const yMin = 2;
    const xMax = 95;
    const yMax = 90;
    return CreateDistributedPoints(this.density).filter(
      p => p.x >= xMin && p.x <= xMax && p.y >= yMin && p.y <= yMax
    );
  }

  /** generate new galaxy */
  generate(matrix?: TPoint[]): void {
    this.matrix = matrix || this.seed();
    this.systems = this.matrix.map(m => {
      const system = new System();
      system.coordinates = {
        x: (m.x * this.canvas.width) / 100,
        y: (m.y * this.canvas.height) / 100,
      };
      return system;
    });
    this.linkSystems(this.systems);
  }

  /** redraw data */
  redraw(): void {
    this.canvas.show(this.systems, { systems: true });
  }

  /** populate galaxy with species from the list */
  populate(): void {
    console.log('populate the galaxy');
  }
}

//   /** find unpopulated system */
//   findUnpopulatedSystem(): System {
//     const lookout = (data: System[]): System => {
//       const index = Math.floor(Math.random() * data.length);
//       const s = data[index];
//       if (data.length && s.populated) {
//         data.splice(index, 1);
//         return lookout(data);
//       }
//       return s;
//     };

//     return lookout([...this.systems]);
//   }
