/** difference between densities */
// MAGIC NUMBERS
const density = (base: number): number => Math.ceil((1 + base) * 5);
/** very dense */
export const galaxyDensityVeryDense = density(0.2);
/** dense */
export const galaxyDensityDense = density(0.3);
/** medium */
export const galaxyDensityMedium = density(0.5);
/** sparse */
export const galaxyDensitySparse = density(0.8);
/** very sparse */
export const galaxyDensityVerySparse = density(1.3);

/** list of available galaxy densities */
export const galaxyDensities = [
  galaxyDensityVeryDense,
  galaxyDensityDense,
  galaxyDensityMedium,
  galaxyDensitySparse,
  galaxyDensityVerySparse,
];

export const galaxySpeciesCountDefault = 3;
export const galaxySpeciesCountMaximum = 6;
export const galaxySpeciesCountMinimum = 2;

// source https://en.wikipedia.org/wiki/List_of_galaxies
/** list of real-world named galaxies */
export const galaxyNames = [
  'Andromeda',
  'Antennae',
  'Backward',
  'Black Eye',
  'Butterfly',
  'Cartwheel',
  'Cigar',
  'Circinus',
  'Coma Pinwheel',
  'Comet',
  'Cosmos Redshift 7',
  'Eye of Sauron',
  'Fireworks',
  'Hockey Stick',
  `Hoag's Object`,
  `Lindsay-Shapley Ring`,
  'Little Sombrero',
  'Medusa Merger',
  `Mayall's Object`,
  'Milky Way',
  'Needle',
  'Pinwheel',
  'Sculptor',
  'Sombrero',
  'Southern Pinwheel',
  'Sunflower',
  'Tadpole',
  'Triangulum',
  'Whirlpool',
];
