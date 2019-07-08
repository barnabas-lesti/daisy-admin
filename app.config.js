const path = require('path');
const yargs = require('yargs');

process.env.NODE_ENV = yargs.argv.env || process.env.NODE_ENV;
process.env.NODE_CONFIG_DIR = path.join(__dirname, './env');

const configLib = require('config');

/**
 * Application configuration object.
 */
module.exports = {
  APP_NAME: process.env.APP_NAME || configLib.get('APP_NAME'),
  ENV: process.env.NODE_ENV,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  MONGO_URI: process.env.MONGO_URI || configLib.get('MONGO_URI'),
  PORT: process.env.PORT || configLib.get('PORT'),
  BASE_URL: process.env.BASE_URL || configLib.get('BASE_URL'),
  SENTRY_DSN: process.env.SENTRY_DSN || configLib.get('SENTRY_DSN'),
  RESPONSE_DELAY: process.env.RESPONSE_DELAY || configLib.get('RESPONSE_DELAY'),
  ACCESS_USERNAME: process.env.ACCESS_USERNAME || configLib.get('ACCESS_USERNAME'),
  ACCESS_PASSWORD: process.env.ACCESS_PASSWORD || configLib.get('ACCESS_PASSWORD'),
};
