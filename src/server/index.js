const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('../../nuxt.config');

const apiRoutes = require('./api/routes');

const app = express();

// Import and Set Nuxt.js options
config.dev = !(process.env.NODE_ENV === 'production');

function connectToDatabase () {
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useNewUrlParser', true);
	mongoose.Promise = Promise;
	mongoose.connect('mongodb://localhost/daisy'); // TODO: from config
}

async function start () {
	// Init Nuxt.js
	const nuxt = new Nuxt(config);

	const { host, port } = nuxt.options.server;

	// Build only in dev mode
	if (config.dev) {
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
	app.listen(port, host);
	consola.ready({
		message: `Server listening on http://${host}:${port}`,
		badge: true,
	});
}

start();
connectToDatabase();
