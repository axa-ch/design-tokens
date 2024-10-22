import type { Dictionary, TransformedToken } from 'style-dictionary/types';
import { filterTokenByPathName } from './utils';

const getBreakpointTokens = filterTokenByPathName('breakpoints');
const mapBreakpoints = (tokens: TransformedToken[]) =>
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

export const getScreens = (dictionary: Dictionary) => {
  const breakpoints = getBreakpointTokens(dictionary);

  return mapBreakpoints(breakpoints);
};
