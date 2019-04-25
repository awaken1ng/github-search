const path = require('path');

module.exports = {
  webpack: function(config, env) {
    console.log(config);
    // ...add your webpack config
    config.resolve.alias['#'] = path.resolve('./src');
    return config;
  }
}
