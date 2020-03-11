import { TGovernor } from '../system/governor/Governor.types';

export type TSpeciesRelations = {};

export type TSpecies = {
  id: string;
  name: string;
  description: string;
  color: string;
  flag: string;
  gravitation: number[];
  defyGravity: boolean;
  atmosphere: number[];
  anaerobic: boolean;
  temperature: number[];
  ignoreTemperature: boolean;
  construction: number;
  leadOfConstruction: TGovernor;
  espionage: number;
  leadOfEspionage: TGovernor;
  fleet: number;
  leadOfFleet: TGovernor;
  population: number;
  leadOfPopulation: TGovernor;
  research: number;
  leadOfResearch: TGovernor;
  relations: TSpeciesRelations;
  player: boolean;
};
