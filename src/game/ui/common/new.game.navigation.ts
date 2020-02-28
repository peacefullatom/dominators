import ApplyCssStyle from '../../../util/applyCssStyle';

export type TNewGameNavigation = {
  previous: () => void;
  next: () => void;
} & Partial<CSSStyleDeclaration>;

const NewGameNavigation = (options: TNewGameNavigation): HTMLDivElement => {
  const navigation = document.createElement('div');
  navigation.className = 'new game navigation';

  const previous = document.createElement('div');
  previous.innerText = 'Previous';
  previous.className = 'previous';
  previous.addEventListener('click', () => options.previous());

  const next = document.createElement('div');
  next.innerText = 'Next';
  next.className = 'next';
  next.addEventListener('click', () => options.next());

  ApplyCssStyle(navigation, options);

  navigation.appendChild(previous);
  navigation.appendChild(next);

  return navigation;
};

export default NewGameNavigation;
