import { TPadding, TPaddingNormal } from '../../types';

const NormalizePadding = (padding: TPadding): TPaddingNormal => {
  if (padding instanceof Array) {
    if (padding.length === 4) {
      const [top, right, bottom, left] = padding;
      return { top, right, bottom, left };
    } else if (padding.length === 3) {
      const [top, horizontal, bottom] = padding;
      return { top, right: horizontal, bottom, left: horizontal };
    } else {
      const [vertical, horizontal] = padding;
      return {
        top: vertical,
        right: horizontal,
        bottom: vertical,
        left: horizontal,
      };
    }
  } else {
    return { top: padding, right: padding, bottom: padding, left: padding };
  }
};

export default NormalizePadding;
