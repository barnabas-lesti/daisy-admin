const path = require('path');
const yargs = require('yargs');

process.env.NODE_ENV = yargs.argv.env || process.env.NODE_ENV;
process.env.NODE_CONFIG_DIR = path.join(__dirname, './env');

const configLib = require('config');

module.exports = {
  ENV: process.env.NODE_ENV,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',

  APP_NAME: process.env.APP_NAME || configLib.get('APP_NAME'),
  PORT: process.env.PORT || configLib.get('PORT'),
  BASE_URL: process.env.BASE_URL || configLib.get('BASE_URL'),
  MONGO_URI: process.env.MONGO_URI || configLib.get('MONGO_URI'),
  SENTRY_DSN: process.env.SENTRY_DSN || configLib.get('SENTRY_DSN'),
  RESPONSE_DELAY: process.env.RESPONSE_DELAY || configLib.get('RESPONSE_DELAY'),

  access: {
    USERNAME: process.env.ACCESS_USERNAME || configLib.get('access.USERNAME'),
    PASSWORD: process.env.ACCESS_PASSWORD || configLib.get('access.PASSWORD'),
  },
};
