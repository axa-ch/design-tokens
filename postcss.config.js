const customMedia = require('postcss-custom-media');

module.exports = () => {
  return {
    plugins: [customMedia],
  };
};
