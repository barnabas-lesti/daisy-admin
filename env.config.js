const path = require('path');
const yargs = require('yargs');

process.env.NODE_ENV = yargs.argv.env || process.env.NODE_ENV;
process.env.NODE_CONFIG_DIR = path.join(__dirname, './env');

const configLib = require('config');

/**
 * Application configuration object.
 */
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT || configLib.get('PORT'),
  BASE_URL: process.env.BASE_URL || configLib.get('BASE_URL'),
  AUTH_SECRET: process.env.AUTH_SECRET || configLib.get('AUTH_SECRET'),
  AUTH_SALT_ROUNDS: process.env.AUTH_SALT_ROUNDS || configLib.get('AUTH_SALT_ROUNDS'),
  DEBUG_RESPONSE_DELAY: process.env.DEBUG_RESPONSE_DELAY || configLib.get('DEBUG_RESPONSE_DELAY'),
  DEBUG_NO_CLIENT: process.env.DEBUG_NO_CLIENT || configLib.get('DEBUG_NO_CLIENT'),
  MONGO_URI: process.env.MONGO_URI || configLib.get('MONGO_URI'),
  SENTRY_DSN: process.env.SENTRY_DSN || configLib.get('SENTRY_DSN'),
  EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS || configLib.get('EMAIL_FROM_ADDRESS'),
  EMAIL_MAILGUN_API_KEY: process.env.EMAIL_MAILGUN_API_KEY || configLib.get('EMAIL_MAILGUN_API_KEY'),
  EMAIL_MAILGUN_DOMAIN: process.env.EMAIL_MAILGUN_DOMAIN || configLib.get('EMAIL_MAILGUN_DOMAIN'),
  HTTP_ACCESS_USERNAME: process.env.HTTP_ACCESS_USERNAME || configLib.get('HTTP_ACCESS_USERNAME'),
  HTTP_ACCESS_PASSWORD: process.env.HTTP_ACCESS_PASSWORD || configLib.get('HTTP_ACCESS_PASSWORD'),
};
