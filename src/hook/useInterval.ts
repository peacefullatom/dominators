import { useEffect, useRef } from 'react';

// source
// https://github.com/Hermanya/use-interval/blob/master/src/index.tsx
/** keep typescript happy */
const noop = (): void => {
  //
};

export default (
  callback: () => void,
  delay: number | null | false,
  immediate?: boolean
): void => {
  const savedCallback = useRef(noop);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Execute callback if immediate is set.
  useEffect(() => {
    if (!immediate) {
      return;
    }
    if (delay === null || delay === false) {
      return;
    }
    savedCallback.current();
  }, [immediate]);

  // Set up the interval.
  useEffect(() => {
    if (!delay) {
      return undefined;
    }

    const tick = (): void => savedCallback.current();

    const id = setInterval(tick, delay);

    return (): void => clearInterval(id);
  }, [delay]);
};
