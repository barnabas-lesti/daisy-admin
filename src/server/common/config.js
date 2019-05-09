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
	ACCESS_PASSWORD: configLib.get('server.ACCESS_PASSWORD'),
	ACCESS_USERNAME: configLib.get('server.ACCESS_USERNAME'),
	ENV: process.env.NODE_ENV,
	IS_PRODUCTION: process.env.NODE_ENV === 'production',
	MONGO_URI: configLib.get('server.MONGO_URI'),
	PORT: configLib.get('server.PORT'),
	RESPONSE_DELAY: configLib.get('server.RESPONSE_DELAY'),
};

module.exports = config;
