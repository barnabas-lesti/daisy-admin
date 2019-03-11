const appRootPath = require('app-root-path').path;
const path = require('path');
const yargs = require('yargs');

process.env.NODE_ENV = yargs.argv.env || process.env.NODE_ENV;
const envDirPath = path.join(appRootPath, './env');
process.env.NODE_CONFIG_DIR = envDirPath;

const configLib = require('config');

/**
 * Application configuration object.
 */
const config = {
	BUCKET_PATH: process.env.BUCKET_PATH || configLib.get('server.BUCKET_PATH'),
	ENV: process.env.NODE_ENV,
	MONGO_URI: process.env.MONGO_URI || configLib.get('server.MONGO_URI'),
	PORT: process.env.PORT || configLib.get('server.PORT'),
	RESPONSE_DELAY: process.env.RESPONSE_DELAY || configLib.get('server.RESPONSE_DELAY') || 0,
};

module.exports = config;
