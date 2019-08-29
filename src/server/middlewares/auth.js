const User = require('../models/user');

module.exports = () => async (req, res, next) => {
  const authHeader = req.header('Authorization') || '';
  // return res.send(authHeader);
  if (!authHeader) return next();

  const [ accessFragment = '', refreshFragment = '' ] = authHeader.split(';');
  const accessToken = accessFragment.replace(/access\s/i, '').trim();
  const refreshToken = refreshFragment.replace(/refresh\s/i, '').trim();
  if (!accessToken || !refreshToken) return next();

  const verificationResult = await User.verifyAccessAndRefreshTokens(accessToken, refreshToken);
  console.log(verificationResult);
  if (!verificationResult) return next();

  const { newAccessToken, payload } = verificationResult;
  res.set('Authorization', User.createAuthorizationHeaderString(newAccessToken, refreshToken));
  req.user = payload;

  return next();
};
