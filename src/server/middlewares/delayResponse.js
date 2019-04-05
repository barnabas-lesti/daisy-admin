const config = require('../common/config');

module.exports = () => (req, res, next) => setTimeout(() => next(), config.RESPONSE_DELAY);
