import './setup.species.scss';

import React from 'react';

import { atmosphereTypes } from '../../galaxy/atmosphere/atmosphere';
import { gravityTypes } from '../../galaxy/gravity/gravity';
import { TSpecies } from '../../galaxy/species/species';
import { temperatureTypes } from '../../galaxy/temperature/temperature';
import UiCommonHeaderWithHomeButtonAndLabel from '../common/header.with.home.button.and.label';
import { TUiCommonHomeButton } from '../common/home.button';
import UiStartNavigation, { TUiStartNavigation } from '../common/start.navigation';
import UiControlMultiple from './control.multiple';
import UiRangeSelector from './range.selector';
import { TSkillName, TUiControlMultipleResult } from './setup.species.types';
import {
  atmosphereLabel,
  gravityLabel,
  scoreParam,
  scoreSkill,
  skillValues,
  temperatureLabel,
  updateControl,
  updateFactor,
} from './util';

type TSetupSpecies = {
  species: TSpecies;
  setSpecies: (s: TSpecies) => void;
} & TUiCommonHomeButton &
  TUiStartNavigation;

const UiSetupSpecies: React.FC<TSetupSpecies> = ({
  species,
  setSpecies,
  home,
  back,
  next,
}) => {
  const gravity = species.defyGravity
    ? scoreParam(gravityTypes) - 1
    : scoreParam(species.gravitation);
  const atmosphere = species.anaerobic
    ? scoreParam(atmosphereTypes) - 1
    : scoreParam(species.atmosphere);
  const temperature = species.ignoreTemperature
    ? scoreParam(temperatureTypes) - 1
    : scoreParam(species.temperature);
  const construction = scoreSkill(species.construction);
  const espionage = scoreSkill(species.espionage);
  const fleet = scoreSkill(species.fleet);
  const reproduction = scoreSkill(species.reproduction);
  const research = scoreSkill(species.research);
  const points = [
    gravity,
    atmosphere,
    temperature,
    construction,
    espionage,
    fleet,
    reproduction,
    research,
  ].reduce((t, n) => t + n);

  const remainingPoints = 15 - points;

  const update = (data: TUiControlMultipleResult): void => {
    console.log(data);
    setSpecies({
      ...species,
      gravitation: updateControl(data.gravitation) || species.gravitation,
      defyGravity: updateFactor(species.defyGravity, data.gravitation),
      atmosphere: updateControl(data.atmosphere) || species.atmosphere,
      anaerobic: updateFactor(species.anaerobic, data.atmosphere),
      temperature: updateControl(data.temperature) || species.temperature,
      ignoreTemperature: updateFactor(
        species.ignoreTemperature,
        data.temperature
      ),
    });
  };

  const updateSkill = (data: number, skill: TSkillName): void => {
    setSpecies({
      ...species,
      construction: skill === 'construction' ? data : species.construction,
      espionage: skill === 'espionage' ? data : species.espionage,
      fleet: skill === 'fleet' ? data : species.fleet,
      reproduction: skill === 'reproduction' ? data : species.reproduction,
      research: skill === 'research' ? data : species.research,
    });
  };

  return (
    <div className='setup species'>
      <UiCommonHeaderWithHomeButtonAndLabel
        home={home}
        label={'Setup species'}
      ></UiCommonHeaderWithHomeButtonAndLabel>
      <div className='content'>
        <div className='row'>
          <div className='section'>
            <UiControlMultiple
              values={gravityTypes.map(v => ({
                value: v,
                label: gravityLabel(v),
                selected: species.gravitation.indexOf(v) !== -1,
              }))}
              factor={species.defyGravity}
              factorName={'Defy gravity'}
              remainingPoints={remainingPoints}
              update={(data): void => update({ gravitation: data })}
            />
          </div>
          <div className='section'>
            <UiControlMultiple
              values={atmosphereTypes.map(v => ({
                value: v,
                label: atmosphereLabel(v),
                selected: species.atmosphere.indexOf(v) !== -1,
              }))}
              factor={species.anaerobic}
              factorName={'Anaerobic'}
              remainingPoints={remainingPoints}
              update={(data): void => update({ atmosphere: data })}
            />
          </div>
        </div>
        <div className='row'>
          <div className='section'>
            <UiControlMultiple
              values={temperatureTypes.map(v => ({
                value: v,
                label: temperatureLabel(v),
                selected: species.temperature.indexOf(v) !== -1,
              }))}
              factor={species.ignoreTemperature}
              factorName={'Ignore temperature'}
              remainingPoints={remainingPoints}
              update={(data): void => update({ temperature: data })}
            />
          </div>
          <div className='section'>
            <UiRangeSelector
              values={skillValues}
              selection={species.construction}
              label={`construction`}
              remainingPoints={remainingPoints}
              update={updateSkill}
            />
            <UiRangeSelector
              values={skillValues}
              selection={species.espionage}
              label={`espionage`}
              remainingPoints={remainingPoints}
              update={updateSkill}
            />
            <UiRangeSelector
              values={skillValues}
              selection={species.fleet}
              label={`fleet`}
              remainingPoints={remainingPoints}
              update={updateSkill}
            />
            <UiRangeSelector
              values={skillValues}
              selection={species.reproduction}
              label={`reproduction`}
              remainingPoints={remainingPoints}
              update={updateSkill}
            />
            <UiRangeSelector
              values={skillValues}
              selection={species.research}
              label={`research`}
              remainingPoints={remainingPoints}
              update={updateSkill}
            />
          </div>
        </div>
        <div className='row'>
          <div className='section'>
            remaining points: {remainingPoints} (
            {[
              gravity,
              atmosphere,
              temperature,
              construction,
              espionage,
              fleet,
              reproduction,
              research,
            ].map((v, i) => (
              <span key={i}>{v}</span>
            ))}
            )
          </div>
        </div>
      </div>
      <UiStartNavigation back={back} next={next}></UiStartNavigation>
    </div>
  );
};

export default UiSetupSpecies;
