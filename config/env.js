const path = require('path');

require('custom-env').env(true);
const base = require('dotenv').config({});
if (base.error) throw base.error;

const expanded = require('dotenv-expand')(base);
const final = require('dotenv-parse-variables')(expanded.parsed);
process.env = { ...process.env, ...final };

const {
  ACCESS_TOKEN_EXPIRATION_IN_MINUTES = 60 * 24 * 7,
  AUTH_SECRET = 'dEfAuLtApPSeCrEt1234',
  AUTH_SALT_ROUNDS = 5,
  BASE_URL = 'http://localhost:3000',
  CLEAN_UP_TEMP_FOLDER = false,
  EMAIL_FROM_ADDRESS = 'no-reply@dev.daisy.com',
  EMAIL_TOKEN_EXPIRATION_IN_MINUTES = 60 * 2,
  HTTP_ACCESS_USERNAME = '',
  HTTP_ACCESS_PASSWORD = '',
  MAILGUN_DOMAIN = '',
  MAILGUN_API_KEY = '',
  MONGO_URI = 'mongodb://localhost/daisy_dev',
  NO_CLIENT = false,
  NODE_ENV = 'development',
  PORT = 3000,
  REGISTRATION_DISABLED = false,
  RESPONSE_DELAY = 0,
  SENTRY_DSN = '',
} = process.env;

/**
 * Application configuration object.
 */
const envConfig = {
  NODE_ENV,
  PORT,
  BASE_URL,
  MONGO_URI,
  SENTRY_DSN,
  AUTH_SECRET,
  ACCESS_TOKEN_EXPIRATION_IN_MINUTES,
  EMAIL_TOKEN_EXPIRATION_IN_MINUTES,
  AUTH_SALT_ROUNDS,
  HTTP_ACCESS_USERNAME,
  HTTP_ACCESS_PASSWORD,
  EMAIL_FROM_ADDRESS,
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  RESPONSE_DELAY,
  NO_CLIENT,
  REGISTRATION_DISABLED,
  CLEAN_UP_TEMP_FOLDER,

  TEMP_FOLDER_PATH: path.join(__dirname, '../temp'),
  STATIC_FOLDER_PATH: path.join(__dirname, '../src/static'),
};

// console.log(envConfig);
module.exports = envConfig;
