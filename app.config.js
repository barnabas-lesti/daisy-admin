const path = require('path');
const yargs = require('yargs');

process.env.NODE_ENV = yargs.argv.env || process.env.NODE_ENV;
process.env.NODE_CONFIG_DIR = path.join(__dirname, './env');

const configLib = require('config');

/**
 * Application configuration object.
 */
module.exports = {
  env: process.env.NODE_ENV,
  isProd: process.env.NODE_ENV === 'production',
  appName: process.env.APP_NAME || configLib.get('appName'),
  port: process.env.PORT || configLib.get('port'),
  baseUrl: process.env.BASE_URL || configLib.get('baseUrl'),
  debug: {
    responseDelay: configLib.get('debug.responseDelay'),
  },
  mongo: {
    uri: configLib.get('mongo.uri'),
  },
  sentry: {
    dsn: configLib.get('sentry.dsn'),
  },
  access: {
    username: configLib.get('access.username'),
    password: configLib.get('access.password'),
  },
  firebase: configLib.get('firebase'),
};
