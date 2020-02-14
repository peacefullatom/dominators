import { facilityPlacement, facilityType } from './facility.const';

/**
 * - description of facility
 * - **use presets**
 */
export type TFacility = {
  /** id of the facility */
  id: string;
  /** name of the facility */
  name: string;
  /** type of the facility */
  type: facilityType;
  /** placement of the facility */
  placement: facilityPlacement;
  /** growth rate modifier */
  growth: number;
  /** espionage level modifier */
  espionage: number;
  /** research level modifier */
  research: number;
  /** construction level modifier */
  construction: number;
  /** level of completeness (0 to 100) */
  progress: number;
};
