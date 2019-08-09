const basicAuth = require('express-basic-auth');

const { HTTP_ACCESS_USERNAME, HTTP_ACCESS_PASSWORD } = require('../../../env.config');

module.exports = () => basicAuth({
  challenge: true,
  users: { [HTTP_ACCESS_USERNAME]: HTTP_ACCESS_PASSWORD },
});
