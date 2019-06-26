const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const nuxtConfig = require('../../nuxt.config');

const config = require('./common/config');
const apiRoutes = require('./api/routes');

const app = express();

nuxtConfig.dev = !config.public.IS_PRODUCTION;

async function connectToDatabase () {
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useNewUrlParser', true);
	mongoose.Promise = Promise;
	await mongoose.connect(config.private.MONGO_URI);
}

(async () => {
	try {
		// Init Nuxt.js
		const nuxt = new Nuxt(nuxtConfig);

		const { host } = nuxt.options.server;
		const port = config.private.PORT;

		await connectToDatabase();

		// Build only in dev mode
		if (!config.public.IS_PRODUCTION) {
			const builder = new Builder(nuxt);
			await builder.build();
		} else {
			await nuxt.ready();
		}

		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());

		for (const route of apiRoutes) {
			app.use('/api', route(express.Router()));
		}

		// Give nuxt middleware to express
		app.use(nuxt.render);

		// Listen the server
		await app.listen(port, host);
		consola.ready({
			message: `Server listening on http://${host}:${port}`,
			badge: true,
		});
	} catch (error) {
		consola.error(error);
		process.exit();
	}
})();
