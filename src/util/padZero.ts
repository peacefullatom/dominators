export default (s: number, l?: number): string => {
  l =
    typeof l !== 'number' || !isFinite(l) || isNaN(s) || l < 0
      ? 2
      : Math.round(l);
  const z = new Array(l).join('0');
  return (z + s).slice(-l);
};
