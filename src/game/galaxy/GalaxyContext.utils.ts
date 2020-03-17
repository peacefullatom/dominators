import { TPlanet } from './system/planet/Planet.types';
import { systemShapeCircle, systemShapeDiamond, systemStatusPeaceful } from './system/System.const';
import { TSystem, TSystemCoordinates } from './system/System.types';

export const galaxyContextSystemCoordinates = (
  system: TSystem
): TSystemCoordinates => {
  if (system.species.length) {
    const player = system.species.find(s => s.data.player);
    const list = system.species
      .filter(s => !s.data.player)
      .map(s => s.data.relations);
    if (player) {
      if (player.discovered || player.canObserve) {
        system.coordinates.shape = systemShapeDiamond;
      }
      if (player.isHabitant) {
        system.coordinates.shape = systemShapeCircle;
      }

      if (player.isHabitant && system.species.length === 1) {
        system.coordinates.status = systemStatusPeaceful;
      }
      // if(player.isHabitant && system.species.length>1 && list.every(s=>s.)){}
    }
  }
  return system.coordinates;
};

export const galaxyContextPlanets = (planets: TPlanet[]): TPlanet[] => {
  return planets.map(planet => ({
    ...planet,
    position: planet.position + planet.speed,
  }));
};
