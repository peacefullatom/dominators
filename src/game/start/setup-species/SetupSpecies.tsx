import './SetupSpecies.scss';

import React from 'react';

import { atmosphereTypes } from '../../../data/atmosphere/atmosphere';
import { gravityTypes } from '../../../data/gravity/gravity';
import { temperatureTypes } from '../../../data/temperature/temperature';
import StartLayout from '../start-layout/StartLayout';
import MultiSelect from './multi-select/MultiSelect';
import { TMultiSelectResult, TSetupSpecies } from './SetupSpecies.types';
import {
  atmosphereLabel,
  gravityLabel,
  scoreParam,
  scoreSkill,
  skillValues,
  temperatureLabel,
  updateControl,
  updateFactor,
} from './SetupSpecies.utils';
import ValueSelect from './value-select/ValueSelect';

const SetupSpecies: React.FC<TSetupSpecies> = ({
  galaxyData,
  setGalaxyData,
  setView,
  back,
  forward,
}) => {
  const { player } = galaxyData;
  const gravity = player.defyGravity
    ? scoreParam(gravityTypes) - 1
    : scoreParam(player.gravitation);
  const atmosphere = player.anaerobic
    ? scoreParam(atmosphereTypes) - 1
    : scoreParam(player.atmosphere);
  const temperature = player.ignoreTemperature
    ? scoreParam(temperatureTypes) - 1
    : scoreParam(player.temperature);
  const construction = scoreSkill(player.construction);
  const espionage = scoreSkill(player.espionage);
  const fleet = scoreSkill(player.fleet);
  const population = scoreSkill(player.population);
  const research = scoreSkill(player.research);
  const points = [
    gravity,
    atmosphere,
    temperature,
    construction,
    espionage,
    fleet,
    population,
    research,
  ].reduce((t, n) => t + n);
  const remainingPoints = 15 - points;

  const update = (data: TMultiSelectResult): void => {
    setGalaxyData({
      ...galaxyData,
      player: {
        ...galaxyData.player,
        gravitation: updateControl(data.gravitation) || player.gravitation,
        defyGravity: updateFactor(!!player.defyGravity, data.gravitation),
        atmosphere: updateControl(data.atmosphere) || player.atmosphere,
        anaerobic: updateFactor(!!player.anaerobic, data.atmosphere),
        temperature: updateControl(data.temperature) || player.temperature,
        ignoreTemperature: updateFactor(
          !!player.ignoreTemperature,
          data.temperature
        ),
      },
    });
  };

  const updateSkill = (data: number, skill: string): void => {
    setGalaxyData({
      ...galaxyData,
      player: {
        ...galaxyData.player,
        construction: skill === 'construction' ? data : player.construction,
        espionage: skill === 'espionage' ? data : player.espionage,
        fleet: skill === 'fleet' ? data : player.fleet,
        population: skill === 'population' ? data : player.population,
        research: skill === 'research' ? data : player.research,
      },
    });
  };

  return (
    <StartLayout setView={setView} back={back} forward={forward}>
      <div className='setup_species'>
        <div className='species_left'>
          <div className='left_avatar'></div>
          <div className='left_name'>{player.name}</div>
          <div className='left_name'>points left {remainingPoints}</div>
        </div>
        <div className='species_right'>
          <div className='right_row'>
            <div className='row_cell'>
              <p className='cell_label'>Gravitation</p>
            </div>
            <div className='row_cell'>
              <p className='cell_label'>Atmosphere</p>
            </div>
          </div>
          <div className='right_row'>
            <div className='row_cell'>
              <MultiSelect
                values={gravityTypes.map(v => ({
                  value: v,
                  label: gravityLabel(v),
                  selected: player.gravitation.indexOf(v) !== -1 ?? false,
                }))}
                factor={player.defyGravity}
                factorName={'Defy gravity'}
                remainingPoints={remainingPoints}
                update={(data): void => update({ gravitation: data })}
              />
            </div>
            <div className='row_cell'>
              <MultiSelect
                values={atmosphereTypes.map(v => ({
                  value: v,
                  label: atmosphereLabel(v),
                  selected: player.atmosphere.indexOf(v) !== -1 ?? false,
                }))}
                factor={player.anaerobic}
                factorName={'Anaerobic'}
                remainingPoints={remainingPoints}
                update={(data): void => update({ atmosphere: data })}
              />
            </div>
          </div>
          <div className='right_row'>
            <div className='row_cell'>
              <p className='cell_label'>Temperature</p>
            </div>
            <div className='row_cell'>
              <p className='cell_label'>Skills</p>
            </div>
          </div>
          <div className='right_row'>
            <div className='row_cell'>
              <MultiSelect
                values={temperatureTypes.map(v => ({
                  value: v,
                  label: temperatureLabel(v),
                  selected: player?.temperature?.indexOf(v) !== -1,
                }))}
                factor={player.ignoreTemperature}
                factorName={'Ignore temperature'}
                remainingPoints={remainingPoints}
                update={(data): void => update({ temperature: data })}
              />
            </div>
            <div className='row_cell'>
              <ValueSelect
                values={skillValues}
                selection={player.construction}
                label={`construction`}
                remainingPoints={remainingPoints}
                update={updateSkill}
              />
              <ValueSelect
                values={skillValues}
                selection={player.espionage}
                label={`espionage`}
                remainingPoints={remainingPoints}
                update={updateSkill}
              />
              <ValueSelect
                values={skillValues}
                selection={player.fleet}
                label={`fleet`}
                remainingPoints={remainingPoints}
                update={updateSkill}
              />
              <ValueSelect
                values={skillValues}
                selection={player.population}
                label={`population`}
                remainingPoints={remainingPoints}
                update={updateSkill}
              />
              <ValueSelect
                values={skillValues}
                selection={player.research}
                label={`research`}
                remainingPoints={remainingPoints}
                update={updateSkill}
              />
            </div>
          </div>
        </div>
      </div>
    </StartLayout>
  );
};

export default SetupSpecies;
