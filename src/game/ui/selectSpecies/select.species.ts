import '../common/button.home.css';
import '../common/new.game.navigation.css';
import './species.list.css';

import N2Px from '../../../util/n2px';
import ButtonHome from '../common/button.home';
import NewGameNavigation from '../common/new.game.navigation';
import { THomeOptions } from '../home/home';
import { TUiBase, TUiBaseOptions, UiBase } from '../ui.base';
import { uiLocationSelectSpecies, uiLocationSetupSpecies } from '../ui.const';
import SpeciesList from './species.list';

export type TSelectSpecies = {} & TUiBase;

export type TSelectSpeciesOptions = (Partial<TSelectSpecies> | SelectSpecies) &
  TUiBaseOptions;

export default class SelectSpecies extends UiBase implements TSelectSpecies {
  background: HTMLCanvasElement;

  constructor(options: THomeOptions) {
    super(options);

    this.name = uiLocationSelectSpecies;
    this.background = this.createLayer();
    this.container.appendChild(this.background);
    this.container.appendChild(
      ButtonHome({
        top: N2Px(0),
        left: N2Px(0),
        width: N2Px(Math.floor(this.width / 10)),
        height: N2Px(Math.floor(this.height / 10)),
        action: () => this.game.home(),
      })
    );
    this.container.appendChild(
      SpeciesList({
        species: this.game.galaxy.species,
        top: N2Px(Math.floor(this.height / 10)),
        left: N2Px(0),
        height: N2Px(Math.floor(this.height - (this.height / 10) * 2)),
      })
    );
    this.container.appendChild(
      NewGameNavigation({
        left: N2Px(0),
        bottom: N2Px(0),
        height: N2Px(this.height / 10),
        next: () => this.navigate(uiLocationSetupSpecies),
        previous: () => this.game.home(),
      })
    );

    this.generateBackground(this.background);
  }
}
