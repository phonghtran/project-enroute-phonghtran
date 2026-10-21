// Right-to-left function composition (replaces recompose's compose).
const compose = (...fns) => (component) =>
  fns.reduceRight((acc, fn) => fn(acc), component);

export default compose;
