/** difference between densities */
const densityStep = 15;
/** very dense 30 */
export const galaxyDensityVeryDense = 30;
/** dense 45 */
export const galaxyDensityDense = galaxyDensityVeryDense + densityStep;
/** medium 60 */
export const galaxyDensityMedium = galaxyDensityDense + densityStep;
/** sparse 75 */
export const galaxyDensitySparse = galaxyDensityMedium + densityStep;
/** very sparse 90 */
export const galaxyDensityVerySparse = galaxyDensitySparse + densityStep;

/** list of available galaxy densities */
export const galaxyDensities = [
  galaxyDensityVeryDense,
  galaxyDensityDense,
  galaxyDensityMedium,
  galaxyDensitySparse,
  galaxyDensityVerySparse,
];

console.log(
  galaxyDensityVeryDense,
  galaxyDensityDense,
  galaxyDensityMedium,
  galaxyDensitySparse,
  galaxyDensityVerySparse
);
