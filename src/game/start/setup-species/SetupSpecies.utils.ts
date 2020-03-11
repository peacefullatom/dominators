import {
  atmosphereTypeHydrogenHelium,
  atmosphereTypeNitrogenCarbonDioxide,
  atmosphereTypeNitrogenMethane,
  atmosphereTypeNitrogenOxygen,
} from '../../../data/atmosphere/atmosphere';
import { gravityTypeHigh, gravityTypeLow } from '../../../data/gravity/gravity';
import { skillTypeHigh, skillTypeLow, skillTypeNormal, skillTypes, skillTypeVeryLow } from '../../../data/skill/skill';
import {
  temperatureTypeCold,
  temperatureTypeHot,
  temperatureTypeNeutral,
  temperatureTypeVeryCold,
  temperatureTypeVeryHot,
} from '../../../data/temperature/temperature';
import { TMultiSelect } from './multi-select/MultiSelect.types';
import { TValueSelectValue } from './value-select/ValueSelect.types';

export const scoreParam = (values?: number[]): number => {
  if (values instanceof Array && values.length) {
    return values.length * 2 - 1;
  }
  return 0;
};

export const scoreSkill = (value?: number): number => {
  if (typeof value === 'number') {
    return skillTypes.indexOf(value) - Math.floor(skillTypes.length / 2);
  }
  return skillTypeNormal;
};

export const updateControl = (
  data?: Partial<TMultiSelect>
): number[] | undefined =>
  data?.values
    ? data.values.filter(v => v.selected).map(v => v.value)
    : undefined;

export const updateFactor = (
  currentValue: boolean,
  data?: Partial<TMultiSelect>
): boolean => (typeof data?.factor === 'boolean' ? data.factor : currentValue);

export const gravityLabel = (g: number): string => {
  let level = 'Normal';
  if (g === gravityTypeLow) {
    level = 'Low';
  }
  if (g === gravityTypeHigh) {
    level = 'High';
  }
  return `${level} gravity`;
};

export const atmosphereLabel = (a: number): string => {
  let type = '';
  if (a === atmosphereTypeHydrogenHelium) {
    type = 'Hydrogen - Helium';
  }
  if (a === atmosphereTypeNitrogenCarbonDioxide) {
    type = 'Nitrogen - Carbon dioxide';
  }
  if (a === atmosphereTypeNitrogenMethane) {
    type = 'Nitrogen - Methane';
  }
  if (a === atmosphereTypeNitrogenOxygen) {
    type = 'Nitrogen - Oxygen';
  }
  return type;
};

export const temperatureLabel = (t: number): string => {
  let type = '';
  if (t === temperatureTypeVeryCold) {
    type = 'very cold';
  }
  if (t === temperatureTypeCold) {
    type = 'cold';
  }
  if (t === temperatureTypeNeutral) {
    type = 'neutral';
  }
  if (t === temperatureTypeHot) {
    type = 'hot';
  }
  if (t === temperatureTypeVeryHot) {
    type = 'very hot';
  }
  return `Temperature ${type}`;
};

export const skillLabel = (s: number): string => {
  if (s === skillTypeVeryLow) {
    return `50%`;
  } else if (s === skillTypeLow) {
    return `75%`;
  } else if (s === skillTypeNormal) {
    return `100%`;
  } else if (s === skillTypeHigh) {
    return `125%`;
  } else {
    return `150%`;
  }
};

export const skillValues: TValueSelectValue[] = skillTypes.map(v => ({
  value: v,
  label: skillLabel(v),
}));
