import { TFacility } from './facility/Facility.types';

export type TPlanet = {
  id: string;
  name: string;
  facilities: TFacility[];
  speed: number;
  position: number;
};
