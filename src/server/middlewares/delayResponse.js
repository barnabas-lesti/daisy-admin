const config = require('../common/config');

const delayResponse = (timeout = config.RESPONSE_DELAY || 0) => (req, res, next) => setTimeout(() => next(), timeout);
module.exports = delayResponse;
