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

  connectToDatabase();

  if (appConfig.access.USERNAME && appConfig.access.PASSWORD) {
    app.use(basicAuth({
      challenge: true,
      users: { [appConfig.access.USERNAME]: appConfig.access.PASSWORD },
    }));
  }

  if (appConfig.RESPONSE_DELAY) {
    app.use((req, res, next) => setTimeout(next, appConfig.RESPONSE_DELAY));
  }

  app.use(bodyParser.json());
  app.use('/api', require('./api').map(routeFactory => routeFactory(express.Router())));

  // const nuxt = new Nuxt(nuxtConfig);
  // if (nuxtConfig.dev) {
  //   const builder = new Builder(nuxt);
  //   await builder.build();
  // } else {
  //   await nuxt.ready();
  // }
  // app.use(nuxt.render);

  const server = app.listen(appConfig.PORT, () => {
    const { address, port } = server.address();
    consola.ready({ message: `Server listening on http://${address}:${port} (BASE_URL: ${appConfig.BASE_URL})`, badge: true });
  });
})();
