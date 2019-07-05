const express = require('express');
const bodyParser = require('body-parser');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');

const nuxtConfig = require('../../nuxt.config');

(async () => {
	const app = express();

	const nuxt = new Nuxt(nuxtConfig);
	const { port } = nuxt.options.server;

	if (nuxtConfig.dev) {
		const builder = new Builder(nuxt);
		await builder.build();
	} else {
		await nuxt.ready();
	}

	if (nuxtConfig.dev) {
		app.use((req, res, next) => setTimeout(next, 500));
	}

	app.use(bodyParser.json());
	app.use('/api', require('./api').map(routeFactory => routeFactory(express.Router())));

	app.use(nuxt.render);

	require('./db')();

	const server = app.listen(port, () => {
		const { address, port } = server.address();
		consola.ready({ message: `Server listening on http://${address}:${port}`, badge: true });
	});
})();
