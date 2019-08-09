const { RESPONSE_DELAY } = require('../../../env.config');

module.exports = () => (req, res, next) => setTimeout(next, RESPONSE_DELAY);
