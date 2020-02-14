import ID from '../../../util/id';
import RandomValue from '../../../util/randomValue';
import { starClass } from './star.const';
import { TStar } from './star.types';

const Star = (name: string): TStar => {
  const star = RandomValue(starClass);
  return {
    id: ID(),
    name,
    spectralClass: star.spectralClass,
    habitableZone: star.habitableZone,
    radius: star.radius,
  };
};

export default Star;
