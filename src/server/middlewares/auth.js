const basicAuth = require('express-basic-auth');

const config = require('../common/config');

module.exports = () => basicAuth({
	challenge: true,
	users: { [config.ACCESS_USERNAME]: config.ACCESS_PASSWORD },
});
