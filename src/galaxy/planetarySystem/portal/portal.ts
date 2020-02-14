import ID from '../../../util/id';
import { TPortal } from './portal.types';

const Portal = (
  planetarySystemName: string,
  planetarySystemId: string
): TPortal => {
  return {
    id: ID(),
    planetarySystemName,
    planetarySystemId,
  };
};

export default Portal;
