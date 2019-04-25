const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias['#'] = path.resolve('./src'); // eslint-disable-line no-param-reassign
    return config;
  },
};
