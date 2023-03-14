const SHADOW_TOKENS_PATH = 'tokens/globals/shadow/';

module.exports.shadowTransformer = ({ value }) => `${value.x} ${value.y} ${value.spread} ${value.blur} ${value.color}`;
module.exports.shadowMatcher = (token) => token?.filePath.includes(SHADOW_TOKENS_PATH);
