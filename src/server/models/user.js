const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const envConfig = require('../../../env.config');
const { emailTemplates, sendEmailWithHtml } = require('../utils/email');
const ApiError = require('../utils/api-error');

const userSchema = new mongoose.Schema({
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

userSchema.statics.hashPassword = async function (password) {
  const passwordHash = await bcrypt.hash(`${password}`, envConfig.AUTH_SALT_ROUNDS);
  return passwordHash;
};

userSchema.statics.getUserAndAuthToken = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    if (await bcrypt.compare(`${password}`, user.passwordHash)) {
      const { passwordHash, ...payload } = user.toObject();
      const authToken = await jwt.sign(payload, envConfig.AUTH_SECRET);
      return { user, authToken };
    }
    throw new ApiError({ code: 'INVALID_PASSWORD' });
  }
  throw new ApiError({ code: 'USER_NOT_FOUND' });
};

userSchema.statics.getUserFromAuthToken = async function (token) {
  try {
    const { _id } = await jwt.verify(token, envConfig.AUTH_SECRET);
    const user = await this.findById(_id).select('-passwordHash');
    return user;
  } catch (error) {
    throw new ApiError({ code: 'INVALID_TOKEN' });
  }
};

userSchema.statics.sendVerificationEmail = async function (email, locale = 'en') {
  const token = await jwt.sign(email, envConfig.AUTH_SECRET);
  const link = encodeURI(`${envConfig.BASE_URL}/${locale}/verify-email?token=${token}`);
  await sendEmailWithHtml({
    to: email,
    ...((emailTemplates[locale] || {}).emailVerification || emailTemplates['en'].emailVerification)(email, link),
  });
};

userSchema.statics.sendPasswordResetEmail = async function (email, locale = 'en') {
  const token = await jwt.sign(email, envConfig.AUTH_SECRET);
  const link = encodeURI(`${envConfig.BASE_URL}/${locale}/reset-password?token=${token}`);
  await sendEmailWithHtml({
    to: email,
    ...((emailTemplates[locale] || {}).passwordReset || emailTemplates['en'].passwordReset)(email, link),
  });
};

userSchema.statics.verifyEmail = async function (token) {
  try {
    const email = await jwt.verify(token, envConfig.AUTH_SECRET);
    await this.findOneAndUpdate({ email }, { isVerified: true });
  } catch (ex) {
    throw new ApiError({ code: 'INVALID_TOKEN' });
  }
};

userSchema.statics.resetPassword = async function (token, password) {
  try {
    const email = await jwt.verify(token, envConfig.AUTH_SECRET);
    await this.findOneAndUpdate({ email }, { passwordHash: await this.hashPassword(password) });
  } catch (ex) {
    throw new ApiError({ code: 'INVALID_TOKEN' });
  }
};

module.exports = mongoose.model('User', userSchema);
