const config = require('../common/config');

const delayResponse = (timeout = config.RESPONSE_DELAY) => (req, res, next) => setTimeout(() => next(), timeout);
module.exports = delayResponse;
