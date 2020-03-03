import {
  galaxyDensityDense,
  galaxyDensityMedium,
  galaxyDensitySparse,
  galaxyDensityVeryDense,
  galaxyDensityVerySparse,
} from '../../galaxy/galaxy.const';

export const densityLabel = (density: number): string => {
  if (density === galaxyDensityVerySparse) {
    return 'very sparse';
  }
  if (density === galaxyDensitySparse) {
    return 'sparse';
  }
  if (density === galaxyDensityMedium) {
    return 'medium';
  }
  if (density === galaxyDensityDense) {
    return 'dense';
  }
  if (density === galaxyDensityVeryDense) {
    return 'very dense';
  }

  return 'unknown';
};
