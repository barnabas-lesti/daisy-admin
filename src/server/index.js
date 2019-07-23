const express = require('express');
const bodyParser = require('body-parser');
const { Nuxt, Builder } = require('nuxt');

const { PORT, BASE_URL, DEBUG_NO_CLIENT, IS_PRODUCTION } = require('../../env.config');
const { logger, Database } = require('./utils');

(async () => {
  const app = express();
  const nuxt = new Nuxt(require('../../nuxt.config'));

  app.use(bodyParser.json());

  app.use(require('./middlewares/http-access')());

  app.use('/api', [
    require('./middlewares/response-delay')(),
    require('./middlewares/populate-user')(),
    ...require('./api').map(routeFactory => routeFactory(express.Router())),
  ]);

  if (DEBUG_NO_CLIENT) {
    logger.info('DEBUG_NO_CLIENT is enabled, skipping client setup');
  } else {
    if (!IS_PRODUCTION) {
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
