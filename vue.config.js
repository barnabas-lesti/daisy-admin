const appRootPath = require('app-root-path').path;
const path = require('path');
const yargs = require('yargs');

process.env.NODE_ENV = yargs.argv.env || process.env.NODE_ENV;
process.env.NODE_CONFIG_DIR = path.join(appRootPath, './env');

const configLib = require('config');

module.exports = {
	configureWebpack: {
		entry: './src/client/main.js',
	},
	chainWebpack: config => {
		config
			.plugin('define')
			.tap(args => {
				const processEnvSettings = args[0]['process.env'];
				args[0]['process.env'] = {
					...processEnvSettings,

					// Custom .env variables
					API_BASE_URL: JSON.stringify(configLib.get('client.API_BASE_URL')),
				};
				return args;
			})
	},
	devServer: {
		port: configLib.get('client.PORT'),
	}
};
