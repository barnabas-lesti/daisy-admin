const { DEBUG_RESPONSE_DELAY } = require('../../../env.config');

module.exports = () => (req, res, next) => DEBUG_RESPONSE_DELAY ? setTimeout(next, DEBUG_RESPONSE_DELAY) : next();
