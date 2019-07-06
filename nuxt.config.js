const appConfig = require('./app.config');

module.exports = {
	mode: 'universal',
	srcDir: './src',

	loading: '~/components/base-loader.vue',

	server: {
		port: appConfig.PORT,
	},

	dev: !appConfig.IS_PRODUCTION,

	head: {
		titleTemplate: '%s | Daisy',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		],
	},

	plugins: [
		'plugins/filters',
		'plugins/i18n',
		'plugins/vuetify',
	],

	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/sentry',
	],

	axios: {
		baseURL: appConfig.BASE_URL,
	},

	sentry: {
		dsn: appConfig.SENTRY_DSN,
	},

	router: {
		middleware: 'i18n',
	},
};
