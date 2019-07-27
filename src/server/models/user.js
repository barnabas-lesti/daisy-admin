const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { AUTH_SALT_ROUNDS, AUTH_SECRET, AUTH_ACCESS_TOKEN_EXPIRATION } = require('../../../env.config');

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
  profileImageUrl: {
    type: String,
  },
  nickname: {
    type: String,
    trim: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  rank: {
    type: String,
    enum: [ 'user', 'admin' ],
    default: 'user',
  },
}, {
  id: false,
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
});

userDbSchema.statics.hashPassword = async (password) => {
  const passwordHash = await bcrypt.hash(`${password}`, AUTH_SALT_ROUNDS);
  return passwordHash;
};

userDbSchema.statics.comparePasswords = async (password, passwordHash) => {
  const result = await bcrypt.compare(`${password}`, passwordHash);
  return result;
};

userDbSchema.statics.createAccessToken = async ({ _id, email, rank }) => {
  const accessToken = await jwt.sign(
    { _id, email, rank },
    AUTH_SECRET,
    { expiresIn: AUTH_ACCESS_TOKEN_EXPIRATION }
  );
  return accessToken;
};

module.exports = mongoose.model('User', userDbSchema);
