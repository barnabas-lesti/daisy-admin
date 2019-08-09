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
  TEMP_FOLDER_PATH: path.join(__dirname, './temp'),
  STATIC_FOLDER_PATH: path.join(__dirname, './src/static'),

  PORT: process.env.PORT || configLib.get('PORT'),
  BASE_URL: process.env.BASE_URL || configLib.get('BASE_URL'),
  MONGO_URI: process.env.MONGO_URI || configLib.get('MONGO_URI'),
  SENTRY_DSN: process.env.SENTRY_DSN || configLib.get('SENTRY_DSN'),
  AUTH_SECRET: process.env.AUTH_SECRET || configLib.get('AUTH_SECRET'),
  ACCESS_TOKEN_EXPIRATION_IN_MINUTES: process.env.ACCESS_TOKEN_EXPIRATION_IN_MINUTES || configLib.get('ACCESS_TOKEN_EXPIRATION_IN_MINUTES'),
  EMAIL_TOKEN_EXPIRATION_IN_MINUTES: process.env.EMAIL_TOKEN_EXPIRATION_IN_MINUTES || configLib.get('EMAIL_TOKEN_EXPIRATION_IN_MINUTES'),
  AUTH_SALT_ROUNDS: process.env.AUTH_SALT_ROUNDS || configLib.get('AUTH_SALT_ROUNDS'),
  HTTP_ACCESS_USERNAME: process.env.HTTP_ACCESS_USERNAME || configLib.get('HTTP_ACCESS_USERNAME'),
  HTTP_ACCESS_PASSWORD: process.env.HTTP_ACCESS_PASSWORD || configLib.get('HTTP_ACCESS_PASSWORD'),
  EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS || configLib.get('EMAIL_FROM_ADDRESS'),
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY || configLib.get('MAILGUN_API_KEY'),
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN || configLib.get('MAILGUN_DOMAIN'),
  RESPONSE_DELAY: process.env.RESPONSE_DELAY || configLib.get('RESPONSE_DELAY'),

  NO_CLIENT: process.env.NO_CLIENT !== undefined ? process.env.NO_CLIENT : configLib.get('NO_CLIENT'),
  REGISTRATION_DISABLED: process.env.REGISTRATION_DISABLED !== undefined ? process.env.REGISTRATION_DISABLED : configLib.get('REGISTRATION_DISABLED'),
  CLEAN_UP_TEMP_FOLDER: process.env.CLEAN_UP_TEMP_FOLDER !== undefined ? process.env.CLEAN_UP_TEMP_FOLDER : configLib.get('CLEAN_UP_TEMP_FOLDER'),
};
