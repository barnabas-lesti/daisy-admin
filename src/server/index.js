const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const { Nuxt, Builder } = require('nuxt');

const nuxtConfig = require('../../nuxt.config');
const envConfig = require('../../env.config');

const { logger, Database } = require('./utils');

const {
  PORT,
  BASE_URL,
  DEBUG_RESPONSE_DELAY,
  DEBUG_NO_CLIENT,
  HTTP_ACCESS_USERNAME,
  HTTP_ACCESS_PASSWORD,
} = envConfig;

(async () => {
  const app = express();
  const nuxt = new Nuxt(nuxtConfig);

  if (HTTP_ACCESS_USERNAME && HTTP_ACCESS_PASSWORD) {
    app.use(basicAuth({
      challenge: true,
      users: { [HTTP_ACCESS_USERNAME]: HTTP_ACCESS_PASSWORD },
    }));
  }

  if (DEBUG_RESPONSE_DELAY) {
    app.use((req, res, next) => setTimeout(next, DEBUG_RESPONSE_DELAY));
  }

  app.use(bodyParser.json());
  app.use('/api', require('./api').map(routeFactory => routeFactory(express.Router())));

  if (DEBUG_NO_CLIENT) {
    logger.info('DEBUG_NO_CLIENT is enabled, skipping client setup');
  } else {
    if (nuxtConfig.dev) {
      const builder = new Builder(nuxt);
      await builder.build();
    } else {
      await nuxt.ready();
    }
    app.use(nuxt.render);
  }

  const db = new Database();
  db.connect();

  const server = app.listen(PORT, () => {
    const { address, port } = server.address();
    logger.success(`Server running at http://${address}:${port} (BASE_URL: ${BASE_URL})`);
  });
})();
