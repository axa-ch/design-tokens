import { filterTokenByPathName } from './utils.js';

const getBreakpointTokens = filterTokenByPathName('breakpoints');
const mapBreakpoints = (tokens) =>
  tokens.reduce(
    (acc, token) =>
      // filter out the breakpoints max boundaries and map the breakpoint names to match tailwind defaults
      token.name.includes('max')
        ? acc
        : {
            ...acc,
            [token.name.replace('breakpoints-base-', '').replace('xxl', '2xl')]: `${token.value}px`,
          },
    {},
  );

export const getScreens = (dictionary) => {
  const breakpoints = getBreakpointTokens(dictionary);

  return mapBreakpoints(breakpoints);
};
