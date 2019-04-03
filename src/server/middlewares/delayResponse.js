const config = require('../common/config');

module.exports = (timeout = config.RESPONSE_DELAY || 0) => (req, res, next) => setTimeout(() => next(), timeout);
