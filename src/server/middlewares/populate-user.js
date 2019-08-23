const jwt = require('jsonwebtoken');

const { AUTH_SECRET } = require('../../../config/env');
const User = require('../models/user');

module.exports = () => async (req, res, next) => {
  const authHeader = req.header('Authorization') || '';
  const [ , accessToken, refreshToken ] = authHeader.split('Bearer ');

  if (accessToken && refreshToken) {
    const shallowUser = await User.verifyAccessToken(accessToken);
    if (shallowUser) {
      req.user = shallowUser;
      return next();
    }

    const refreshPayload = await User.verifyRefreshToken(refreshToken);
  }

  return next();
};
