import ApplyCssStyle from '../../../util/applyCssStyle';

export type TButtonHome = {
  action: () => void;
} & Partial<CSSStyleDeclaration>;

const ButtonHome = (options: TButtonHome): HTMLDivElement => {
  const button = document.createElement('div');
  button.innerText = 'Home';
  button.className = 'button home';
  button.addEventListener('click', () => options.action());
  ApplyCssStyle(button, options);

  return button;
};

export default ButtonHome;
