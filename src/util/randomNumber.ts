/** get random value from range */
const RandomNumber = (to?: number, from?: number): number =>
  Math.floor(Math.random() * (to ?? 100)) + (from ?? 0);

export default RandomNumber;
