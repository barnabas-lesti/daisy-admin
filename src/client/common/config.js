const config = {
	API_BASE_URL: process.env.API_BASE_URL,
	DEFAULT_LAYOUT: process.env.DEFAULT_LAYOUT,
	DEFAULT_LOCALE: process.env.DEFAULT_LOCALE,
	BASE_URL: process.env.BASE_URL,
	NODE_ENV: process.env.NODE_ENV,

	IS_PRODUCTION: process.env.NODE_ENV === 'production',
};

export default config;
