const appConfig = require('./app.config');

module.exports = {
	mode: 'universal',
	srcDir: './src',

	loading: '~/components/base-loader.vue',

	server: {
		port: appConfig.env.PORT,
		host: appConfig.env.HOST,
	},

	dev: !appConfig.env.IS_PRODUCTION,

	plugins: [
		'plugins/filters',
		'plugins/i18n',
		'plugins/vuetify',
	],

	modules: [
		'@nuxtjs/axios',
	],

	router: {
		middleware: 'i18n',
	},

	axios: {
		// See https://github.com/nuxt-community/axios-module#options
	},

	head: {
		titleTemplate: '%s | Daisy',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		],
	},
};
