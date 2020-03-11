import { useEffect, useState } from 'react';

import { TDimensions } from '../types';

export default (ref: React.RefObject<HTMLElement>): TDimensions | undefined => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const measure = (): void => {
      if (ref.current) {
        setDimensions({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      }
    };

    measure();

    window.addEventListener('resize', measure);

    return (): void => window.removeEventListener('resize', measure);
  }, [ref]);

  return dimensions;
};
