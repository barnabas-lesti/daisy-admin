const express = require('express');
const bodyParser = require('body-parser');
const { Nuxt, Builder } = require('nuxt');

const { PORT, BASE_URL, DEBUG_NO_CLIENT, IS_PRODUCTION } = require('../../env.config');
const { logger, Database } = require('./utils');

class App {
  constructor () {
    this._server = null;
    this._app = express();
    this._nuxt = new Nuxt(require('../../nuxt.config'));
    this._db = new Database();

    this._app.use(bodyParser.json());
    this._app.use(require('./middlewares/http-access')());
    this._app.use('/api', [
      require('./middlewares/response-delay')(),
      require('./middlewares/populate-user')(),
      ...require('./api').map(routeFactory => routeFactory(express.Router())),
    ]);
  }

  async start () {
    if (DEBUG_NO_CLIENT) {
      logger.info('DEBUG_NO_CLIENT is enabled, skipping client setup');
    } else {
      if (!IS_PRODUCTION) {
        const builder = new Builder(this._nuxt);
        await builder.build();
      } else {
        await this._nuxt.ready();
      }
      this._app.use(this._nuxt.render);
    }

    await this._db.connect();
    this._server = await this._app.listen(PORT);
    const { address } = this._server.address();
    logger.success(`Server running at http://${address}:${PORT} (BASE_URL: ${BASE_URL})`);
  }

  async stop () {
    await this._db.disconnect();
    if (this._server) {
      await this._server.close();
      logger.success('Server stopped');
    } else {
      logger.info("No running servers, can't exit");
    }
  }
}

module.exports = new App();
