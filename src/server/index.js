const fs = require('fs-extra');
const express = require('express');
const bodyParser = require('body-parser');
const { Nuxt, Builder } = require('nuxt');

const {
  NODE_ENV,
  PORT,
  BASE_URL,
  NO_CLIENT,
  TEMP_DIR_PATH,
  CLEAN_UP_TEMP_FOLDER,
} = require('../../config/env');
const { logger, database } = require('./utils');

(async () => {
  const app = express();
  const nuxt = new Nuxt(require('../../config/nuxt'));

  app.use([
    require('./middlewares/http-access')(),
  ]);

  app.use('/api', [
    bodyParser.json(),
    require('./middlewares/config')(),
    require('./middlewares/response-delay')(),
    require('./middlewares/auth')(),
    ...require('./api').map(routeFactory => routeFactory(express.Router())),
  ]);

  logger.info(`Using configuration: "${NODE_ENV}"`);

  if (NO_CLIENT) {
    logger.info('NO_CLIENT is enabled, skipping client setup');
  } else {
    logger.info('Building client...');
    if (NODE_ENV !== 'production') {
      const builder = new Builder(nuxt);
      await builder.build();
    } else {
      await nuxt.ready();
    }
    app.use(nuxt.render);
    logger.success('Client ready');
  }

  await createTempDir();
  database.connect();

  const server = await app.listen(PORT);
  const { address } = server.address();
  logger.success(`Server running at http://${address}:${PORT} (BASE_URL: ${BASE_URL})`);
})();

async function createTempDir () {
  if (CLEAN_UP_TEMP_FOLDER && await fs.pathExists(TEMP_DIR_PATH)) await fs.remove(TEMP_DIR_PATH);

  await fs.ensureDir(TEMP_DIR_PATH);
  logger.success(`TEMP directory ready (cleanup: ${CLEAN_UP_TEMP_FOLDER})`);
}
