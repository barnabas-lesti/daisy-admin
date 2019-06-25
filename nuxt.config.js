
module.exports = {
	mode: 'universal',
	srcDir: './src',
	loading: false,

	/*
	** Headers of the page
	*/
	head: {
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		],
	},

	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		'plugins/i18n',
	],

	/*
	** Router configuration
	*/
	router: {
		middleware: 'i18n',
	},

	/*
	** Nuxt.js modules
	*/
	modules: [
		'@nuxtjs/bulma',
		'@nuxtjs/axios',
		'@nuxtjs/eslint-module',
	],

	/*
	** Axios module configuration
	** See https://axios.nuxtjs.org/options
	*/
	axios: {
	},

	/*
	** Build configuration
	*/
	build: {
		postcss: {
			preset: {
				features: {
					customProperties: false,
				},
			},
		},
	},
};
