const delayResponse = (timeout = 1000) => (req, res, next) => setTimeout(() => next(), timeout);
module.exports = delayResponse;
