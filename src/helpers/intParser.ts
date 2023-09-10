export const intParser = (value?: string, byDefault = 0) =>
  value && !isNaN(+value) ? +value : byDefault;
