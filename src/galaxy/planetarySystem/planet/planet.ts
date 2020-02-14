import ID from '../../../util/id';
import RandomNumber from '../../../util/randomNumber';
import RandomValue from '../../../util/randomValue';
import { atmosphereType } from '../../common/atmosphere.const';
import { temperatureType } from '../../common/temperature.const';
import { planetAbundanceMax, planetAbundanceMin, planetSizeMax, planetSizeMin } from './planet.const';
import { TPlanet } from './planet.types';

const name = (index: number, system: string): string => {
  let order: string[] = [];
  if (index >= 10) {
    order.push(`X`);
    index = index - 10;
  }
  if (index >= 9) {
    order.push(`IX`);
  }
  if (index >= 5 && index < 9) {
    order.push(`V`);
    order.push(Array.from({ length: index - 5 }, () => `I`).join(``));
  }
  if (index > 3 && index < 5) {
    order.push(`IV`);
  }
  if (index < 4) {
    order.push(Array.from({ length: index }, () => `I`).join(``));
  }
  return `${system}-${order.join(``)}`;
};

const Planet = (index: number, system: string): TPlanet => ({
  id: ID(),
  name: name(index + 2, system),
  abundance: RandomNumber(planetAbundanceMax, planetAbundanceMin),
  atmosphere: RandomValue(atmosphereType),
  facilities: [],
  homePlanet: false,
  initialGrowthRate: 0,
  growthRate: 0,
  initialPopulation: 0,
  maximumPopulation: 0,
  population: 0,
  constructionPoints: 0,
  espionagePoints: 0,
  researchPoints: 0,
  size: RandomNumber(planetSizeMax, planetSizeMin),
  species: '',
  temperature: RandomValue(temperatureType),
});

export default Planet;
