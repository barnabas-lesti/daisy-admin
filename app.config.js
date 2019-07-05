const path = require('path');
const yargs = require('yargs');

process.env.NODE_ENV = yargs.argv.env || process.env.NODE_ENV;
process.env.NODE_CONFIG_DIR = path.join(__dirname, './env');

const configLib = require('config');

/**
 * Application configuration object.
 */
module.exports = {
	common: {
		APP_NAME: 'DaisyWebApp',
	},
	env: {
		ENV: process.env.NODE_ENV,
		IS_PRODUCTION: process.env.NODE_ENV === 'production',
		MONGO_URI: process.env.MONGO_URI || configLib.get('MONGO_URI'),
		PORT: process.env.PORT || configLib.get('PORT') || 3000,
	},
};
