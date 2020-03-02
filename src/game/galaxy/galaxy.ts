import ID from '../../util/id';

export type TGalaxy = {
  id: string;
};

export type TGalaxyOptions = Partial<TGalaxy> | TGalaxy;

export default function Galaxy(options?: TGalaxy): TGalaxy {
  return {
    id: options?.id ?? ID(),
  };
}

// /** galaxy description */
// export type TGalaxy = {
//   /** galaxy id */
//   id: string;
//   density: number;
//   /** systems data */
//   systems: System[];
//   /** number of species */
//   speciesCount: number;
//   /** species data */
//   species: TSpecies[];
//   /** parent for galaxy canvas */
//   parent?: HTMLElement;
// };

// /** galaxy options */
// export type TGalaxyOptions = Partial<TGalaxy> | Galaxy;

// /** galaxy data */
// export default class Galaxy implements TGalaxy {
//   id: string;
//   density: TGalaxyDensity;
//   systems: System[];
//   speciesCount: number;
//   species: TSpecies[];
//   parent?: HTMLElement;
//   /** galaxy canvas */
//   canvas: GalaxyCanvas;

//   constructor(options?: TGalaxyOptions) {
//     this.id = options?.id ?? ID();
//     this.canvas = new GalaxyCanvas({ parent: options?.parent });
//     this.density = options?.density ?? galaxyDensityMedium;
//     this.systems = this.generateSystems(options?.systems);
//     this.speciesCount = options?.speciesCount ?? 3;
//     this.species = this.generateSpecies(options?.species);
//     this.setup();
//   }

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

//   setDensity(density: TGalaxyDensity): void {
//     this.density = density;
//   }

//   /** galaxy setup upon creation */
//   setup(): void {
//     this.species.forEach(s => {
//       const system = this.findUnpopulatedSystem();
//       system.populate(s);
//     });
//   }

//   /** link systems */
//   linkSystems(systems: System[]): void {
//     const orphans = systems.filter(o => !o.wormholes.length);
//     if (orphans.length) {
//       const list = systems.filter(s => s.wormholes.length);
//       const sources = list.length ? list : [RandomValue(systems)];
//       const destinations = systems.filter(s => !s.wormholes.length);

//       const pairs = sources
//         .map(s => {
//           const d = destinations
//             .filter(d => d.id !== s.id)
//             .map(d => ({
//               d,
//               r: Math.hypot(
//                 s.coordinates.x - d.coordinates.x,
//                 s.coordinates.y - d.coordinates.y
//               ),
//             }))
//             .sort((a, b) => a.r - b.r)
//             .shift();
//           return { s, d: d?.d, r: d?.r };
//         })
//         .sort((a, b) => (a?.r ?? 0) - (b?.r ?? 0))
//         .slice(0, RandomNumber(3));

//       pairs.forEach(p => {
//         const { s, d } = p;
//         if (d) {
//           s.wormholes.push(d);
//           d.wormholes.push(s);
//         }
//       });

//       if (orphans.length) {
//         this.linkSystems(systems);
//       }
//     }
//   }

//   /** generate systems */
//   generateSystems(options?: System[]): System[] {
//     if (options instanceof Array && options.length) {
//       return options.map(source => new System(source));
//     }

//     const gap = 5;
//     const systems = CreateDistributedPoints(this.canvas, this.density)
//       .filter(p => p.x >= gap && p.y >= gap)
//       .map(coordinates => new System({ coordinates }));

//     this.linkSystems(systems);

//     return systems;
//   }

//   /** generate species */
//   generateSpecies(options?: TSpecies[]): TSpecies[] {
//     if (options instanceof Array && options.length) {
//       return options.map(source => Species(source));
//     }
//     const species = Array.from({ length: this.speciesCount }, () => Species());
//     species.forEach(s => {
//       species.forEach(d => {
//         if (s.id !== d.id) {
//           s.relations[d.id] = {
//             activities: { research: false, routeSharing: false, trade: false },
//             relations: speciesRelationsTypeNeutral,
//           };
//         }
//       });
//     });
//     return species;
//   }

//   /** show galaxy view */
//   show(): void {
//     this.canvas.show(this);
//   }

//   /** hide galaxy view */
//   hide(): void {
//     this.canvas.hide();
//   }
// }
