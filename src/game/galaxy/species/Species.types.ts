import { TGovernor } from '../system/governor/Governor.types';

export type TSpeciesCommonActivities = {
  trade: boolean;
  routeSharing: boolean;
  research: boolean;
};

export type TSpeciesRelations = {
  species: string;
  relations: number;
  activities: TSpeciesCommonActivities;
};

export type TSpecies = {
  id: string;
  name: string;
  description: string;
  color: string;
  flag: string;
  gravity: number[];
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
  relations: TSpeciesRelations[];
  player: boolean;
};
