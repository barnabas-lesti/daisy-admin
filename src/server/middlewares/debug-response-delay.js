const { RESPONSE_DELAY } = require('../../../config/env');

module.exports = () => (req, res, next) => setTimeout(next, RESPONSE_DELAY);
