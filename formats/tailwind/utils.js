export const filterTokenByPathName =
  (type) =>
  ({ allTokens }) =>
    allTokens.filter((token) => token.path.join('.').includes(type));
