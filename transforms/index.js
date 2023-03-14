const { shadowMatcher, shadowTransformer } = require('./box-shadow');

module.exports.shadowCSSTransform = {
  matcher: shadowMatcher,
  name: 'shadow/css',
  transformer: shadowTransformer,
  type: 'value',
};

module.exports.shadowSCSSTransform = {
  matcher: shadowMatcher,
  name: 'shadow/scss',
  transformer: shadowTransformer,
  type: 'value',
};
