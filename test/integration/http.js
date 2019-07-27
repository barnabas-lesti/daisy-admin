const axios = require('axios');

const { BASE_URL } = require('../../env.config');

module.exports = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
});
