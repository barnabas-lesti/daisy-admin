const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  AUTH_SALT_ROUNDS,
  AUTH_SECRET,
  ACCESS_TOKEN_EXPIRATION_IN_MINUTES,
  REFRESH_TOKEN_EXPIRATION_IN_MINUTES,
  EMAIL_TOKEN_EXPIRATION_IN_MINUTES,
} = require('../../../config/env');

const userDbSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    trim: true,
  },
  rank: {
    type: String,
    enum: [ 'user', 'admin' ],
    default: 'user',
  },
  profileImageUrl: {
    type: String,
    default: '',
  },
}, {
  id: false,
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
});

const User = mongoose.model('User', userDbSchema);

const createRefreshTokenSecret = ({ passwordHash }) => AUTH_SECRET + passwordHash;

const createAccessToken = async ({ email, fullName }) => {
  const expiresIn = `${ACCESS_TOKEN_EXPIRATION_IN_MINUTES}m`;
  const accessToken = await jwt.sign({ email, fullName }, AUTH_SECRET, { expiresIn });
  return accessToken;
};

const createRefreshToken = async (user) => {
  const refreshTokenSecret = createRefreshTokenSecret(user);
  const expiresIn = `${REFRESH_TOKEN_EXPIRATION_IN_MINUTES}m`;
  const refreshToken = await jwt.sign({ email: user.email }, refreshTokenSecret, { expiresIn });
  return refreshToken;
};

const verifyAccessToken = async (accessToken) => {
  try {
    const shallowUser = await jwt.verify(accessToken, AUTH_SECRET);
    return shallowUser;
  } catch (jwtError) {
    return null;
  }
};

const verifyRefreshToken = async (refreshToken) => {
  const shallowUser = jwt.decode(refreshToken);
  if (!shallowUser) return null;

  const userDoc = await User.findOne({ email: shallowUser.email });
  if (!userDoc) return null;

  try {
    const refreshTokenSecret = createRefreshTokenSecret(shallowUser);
    await jwt.verify(refreshToken, refreshTokenSecret);
    const { passwordHash, ...user } = userDoc.toObject();
    return user;
  } catch (jwtError) {
    return null;
  }
};

User.hashPassword = async (password) => {
  const passwordHash = await bcrypt.hash(`${password}`, AUTH_SALT_ROUNDS);
  return passwordHash;
};

User.comparePasswords = async (password, passwordHash) => {
  const result = await bcrypt.compare(`${password}`, passwordHash);
  return result;
};

User.createAccessAndRefreshTokens = async (user) => {
  const [ accessToken, refreshToken ] = await Promise.all([
    createAccessToken(user),
    createRefreshToken(user),
  ]);
  return { accessToken, refreshToken };
};

User.createPasswordResetToken = async ({ email }) => {
  const token = await jwt.sign({ email }, AUTH_SECRET, { expiresIn: `${EMAIL_TOKEN_EXPIRATION_IN_MINUTES}m` });
  return token;
};

User.createAuthorizationHeaderString = (accessToken, refreshToken) => `Access ${accessToken}; Refresh ${refreshToken};`;

User.verifyAccessAndRefreshTokens = async (accessToken, refreshToken) => {
  const accessPayload = await verifyAccessToken(accessToken);
  if (accessPayload) return { payload: accessPayload };

  const refreshPayload = await await verifyRefreshToken(refreshToken);
  if (refreshPayload) {
    const newAccessToken = await createAccessToken(refreshPayload);
    return { payload: refreshPayload, newAccessToken };
  }

  return null;
};

module.exports = User;
