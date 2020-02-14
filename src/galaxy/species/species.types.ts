import { TGovernor } from '../planetarySystem/governor/governor.types';

/** species  */
export type TSpecies = {
  /** id of the species */
  id: string;
  /** name of the species */
  name: string;
  /** list of suitable atmospheres */
  atmosphere: number[];
  /** range of suitable temperatures */
  temperature: number[];
  /** non aerobics can live in any atmosphere */
  nonAerobic: boolean;
  /** underground dwellers can live in any temperature */
  undergroundDwellers: boolean;
  /** link to the governor appointed to lead construction */
  construction?: TGovernor;
  /** link to the governor appointed to lead espionage */
  espionage?: TGovernor;
  /** link to the governor appointed to lead battles */
  fleet?: TGovernor;
  /** link to the governor appointed to lead research */
  research?: TGovernor;
};