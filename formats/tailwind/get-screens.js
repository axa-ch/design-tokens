const { filterTokenByPathName } = require('./utils');

const getBreakpointTokens = filterTokenByPathName('breakpoints');
const mapBreakpoints = (tokens) =>
  tokens.reduce(
    (acc, token) =>
      // filter out the breakpoints max boundaries
      token.name.includes('max')
        ? acc
        : {
            ...acc,
            [token.name.replace(`breakpoints-base-`, '')]: `${token.value}px`,
          },
    {},
  );

module.exports.getScreens = (dictionary) => {
  const radius = getBreakpointTokens(dictionary);

  return mapBreakpoints(radius);
};