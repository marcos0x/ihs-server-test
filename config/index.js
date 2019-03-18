const { argv } = require('yargs');

const nodeEnv = argv.env || process.env.NODE_ENV || 'development';
const config = {
  development: require('./development'),
  testing: require('./testing'),
  staging: require('./staging'),
  production: require('./production')
};

module.exports = config[nodeEnv];
