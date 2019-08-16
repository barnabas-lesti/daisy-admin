const path = require('path');

require('custom-env').env(true);
const base = require('dotenv').config({});
if (base.error) throw base.error;

const expanded = require('dotenv-expand')(base);
const final = require('dotenv-parse-variables')(expanded.parsed);
process.env = { ...process.env, ...final };

const {
  ACCESS_TOKEN_EXPIRATION_IN_MINUTES = 0,
  AUTH_SALT_ROUNDS = 0,
  AUTH_SECRET = '',
  BASE_URL = '',
  CLEAN_UP_TEMP_FOLDER = false,
  EMAIL_FROM_ADDRESS = '',
  EMAIL_TOKEN_EXPIRATION_IN_MINUTES = 0,
  HTTP_ACCESS_USERNAME = '',
  HTTP_ACCESS_PASSWORD = '',
  MAILGUN_DOMAIN = '',
  MAILGUN_API_KEY = '',
  MONGO_URI = '',
  NO_CLIENT = false,
  NODE_ENV = '',
  PORT = 0,
  REGISTRATION_DISABLED = false,
  RESPONSE_DELAY = 0,
  SENTRY_DSN = '',
} = process.env;

const TEMP_FOLDER_PATH = path.join(__dirname, '../temp');
const STATIC_FOLDER_PATH = path.join(__dirname, '../src/static');

/**
 * Application configuration object.
 */
const envConfig = {
  ACCESS_TOKEN_EXPIRATION_IN_MINUTES,
  AUTH_SALT_ROUNDS,
  AUTH_SECRET,
  BASE_URL,
  CLEAN_UP_TEMP_FOLDER,
  EMAIL_FROM_ADDRESS,
  EMAIL_TOKEN_EXPIRATION_IN_MINUTES,
  HTTP_ACCESS_USERNAME,
  HTTP_ACCESS_PASSWORD,
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  MONGO_URI,
  NO_CLIENT,
  NODE_ENV,
  PORT,
  REGISTRATION_DISABLED,
  RESPONSE_DELAY,
  SENTRY_DSN,

  TEMP_FOLDER_PATH,
  STATIC_FOLDER_PATH,
};

module.exports = envConfig;
