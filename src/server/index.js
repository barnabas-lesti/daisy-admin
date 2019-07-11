const express = require('express');
const bodyParser = require('body-parser');
const consola = require('consola');
const basicAuth = require('express-basic-auth');
const { Nuxt, Builder } = require('nuxt');

const nuxtConfig = require('../../nuxt.config');
const appConfig = require('../../app.config');

const connectToDatabase = require('./db');

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

  const { username, password } = appConfig.access;
  if (username && password) {
    app.use(basicAuth({
      challenge: true,
      users: { [username]: password },
    }));
  }

  if (appConfig.debug.responseDelay) {
    app.use((req, res, next) => setTimeout(next, appConfig.debug.responseDelay));
  }

  app.use(bodyParser.json());
  app.use('/api', require('./api').map(routeFactory => routeFactory(express.Router())));

  app.use(nuxt.render);

  connectToDatabase();

  const server = app.listen(port, () => {
    const { address, port } = server.address();
    consola.ready({ message: `Server listening on http://${address}:${port} (baseUrl: ${appConfig.baseUrl})`, badge: true });
  });
})();
