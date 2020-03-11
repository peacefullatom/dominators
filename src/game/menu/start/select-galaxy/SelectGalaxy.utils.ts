import {
  galaxyDensityDense,
  galaxyDensityMedium,
  galaxyDensitySparse,
  galaxyDensityVerySparse,
} from '../../../../data/galaxy/galaxy';

export const densityLabel = (d: number): string => {
  if (d === galaxyDensityVerySparse) {
    return `very sparse`;
  } else if (d === galaxyDensitySparse) {
    return `sparse`;
  } else if (d === galaxyDensityMedium) {
    return `medium`;
  } else if (d === galaxyDensityDense) {
    return `dense`;
  } else {
    return `very dense`;
  }
};
