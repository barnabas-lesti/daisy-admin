const basicAuth = require('express-basic-auth');

const { HTTP_ACCESS_USERNAME, HTTP_ACCESS_PASSWORD } = require('../../../config/env');
const { logger } = require('../utils');

module.exports = () => {
  if (HTTP_ACCESS_USERNAME && HTTP_ACCESS_PASSWORD) {
    logger.info('Using http-access middleware');
    return basicAuth({
      challenge: true,
      users: { [HTTP_ACCESS_USERNAME]: HTTP_ACCESS_PASSWORD },
    });
  }

  return (req, res, next) => next();
};
