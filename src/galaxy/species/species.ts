import ID from '../../util/id';
import RandomBoolean from '../../util/randomBoolean';
import RandomValue from '../../util/randomValue';
import { atmosphereType } from '../common/atmosphere.const';
import { temperatureType } from '../common/temperature.const';
import { speciesName } from './species.const';
import { TSpecies } from './species.types';

const Species = (): TSpecies => {
  const nonAerobic = RandomBoolean();
  const undergroundDwellers = RandomBoolean();
  const atmosphere = nonAerobic ? [] : [RandomValue(atmosphereType)];
  const temperature = undergroundDwellers ? [] : [RandomValue(temperatureType)];
  return {
    id: ID(),
    name: RandomValue(speciesName),
    atmosphere,
    temperature,
    nonAerobic,
    undergroundDwellers,
  };
};

export default Species;
