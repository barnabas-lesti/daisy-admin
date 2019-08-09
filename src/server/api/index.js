const { NODE_ENV } = require('../../../env.config');
const { logger } = require('../utils');

const routes = [
  require('./exercises'),
  require('./ingredients'),
  require('./recipes'),
  require('./auth'),
];

if (NODE_ENV === 'test') {
  routes.push(...[
    require('./test'),
  ]);
  logger.info('TEST routes initialized: /api/test');
}

module.exports = routes;
