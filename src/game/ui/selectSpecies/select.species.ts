import { TUiBase, TUiBaseOptions, UiBase } from '../base';
import { THomeOptions } from '../home/home';
import { uiLocationSelectSpecies } from '../ui.const';

export type TSelectSpecies = {} & TUiBase;

export type TSelectSpeciesOptions = (Partial<TSelectSpecies> | SelectSpecies) &
  TUiBaseOptions;

export default class SelectSpecies extends UiBase implements TSelectSpecies {
  constructor(options: THomeOptions) {
    super(options);
    this.name = uiLocationSelectSpecies;
  }
}
