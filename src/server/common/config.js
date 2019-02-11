const path = require('path');
const appRootPath = require('app-root-path').path;
const yargs = require('yargs');

process.env.NODE_ENV = yargs.argv.env || process.env.NODE_ENV;
const envDirPath = path.join(appRootPath, './env');
process.env.NODE_CONFIG_DIR = envDirPath;

const configLib = require('config');

/**
 * Application configuration object.
 */
const config = {
	common: {
		PORT: configLib.get('common.PORT'),
	},
};

module.exports = config;
