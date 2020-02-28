import ApplyCssStyle from '../../../util/applyCssStyle';
import Species from '../../galaxy/species/species';

export type TSpeciesList = {
  species: Species[];
} & Partial<CSSStyleDeclaration>;

const SpeciesList = (options: TSpeciesList): HTMLDivElement => {
  const list = document.createElement('div');
  list.className = 'species list';
  ApplyCssStyle(list, options);
  return list;
};

export default SpeciesList;
