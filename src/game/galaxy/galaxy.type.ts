import {
  galaxyDensityDense,
  galaxyDensityMedium,
  galaxyDensitySparse,
  galaxyDensityVeryDense,
  galaxyDensityVerySparse,
} from './galaxy.const';

export type TGalaxyDensity =
  | typeof galaxyDensityVeryDense
  | typeof galaxyDensityDense
  | typeof galaxyDensityMedium
  | typeof galaxyDensitySparse
  | typeof galaxyDensityVerySparse;
