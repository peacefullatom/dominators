/** get random value from range */
const RandomNumber = (max?: number, min?: number): number =>
  Math.floor(Math.random() * ((max ?? 100) - (min ?? 0))) + (min ?? 0);

export default RandomNumber;
