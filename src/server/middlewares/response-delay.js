const { RESPONSE_DELAY } = require('../../../config/env');
const { logger } = require('../utils');

module.exports = () => {
  if (RESPONSE_DELAY) {
    logger.info(`Using debug-response-delay middleware on /api (timeout: ${RESPONSE_DELAY})`);
    return (req, res, next) => setTimeout(next, RESPONSE_DELAY);
  }

  return (req, res, next) => next();
};
