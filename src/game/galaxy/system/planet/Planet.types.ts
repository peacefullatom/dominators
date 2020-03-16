import { TSpecies } from '../../species/Species.types';
import { TFacility } from './facility/Facility.types';

export type TPlanet = {
  id: string;
  name: string;
  populated: boolean;
  abundance: number;
  size: number;
  speed: number;
  position: number;
  orbit: number;
  gravity: number[];
  atmosphere: number[];
  temperature: number[];
  constructionPoints: number;
  espionagePoints: number;
  researchPoints: number;
  populationPoints: number;
  populationMaximumInitial: number;
  populationMaximum: number;
  population: number;
  defensePointsMaximumInitial: number;
  defensePointsMaximum: number;
  defensePoints: number;
  facilities: TFacility[];
  species?: TSpecies;
};
