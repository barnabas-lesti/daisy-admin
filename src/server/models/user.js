const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const envConfig = require('../../../env.config');

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
  fullName: {
    type: String,
    trim: true,
  },
  nickname: {
    type: String,
    trim: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, {
  id: false,
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
});

userDbSchema.statics.hashPassword = async function (password) {
  const passwordHash = await bcrypt.hash(`${password}`, envConfig.AUTH_SALT_ROUNDS);
  return passwordHash;
};

userDbSchema.statics.comparePasswords = async function (password, passwordHash) {
  const result = await bcrypt.compare(`${password}`, passwordHash);
  return result;
};

module.exports = mongoose.model('User', userDbSchema);
