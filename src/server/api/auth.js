const jwt = require('jsonwebtoken');

const envConfig = require('../../../env.config');
const User = require('../models/user');
const { Mail, logger } = require('../utils');

module.exports = (router) => {
  router.route('/auth/sign-in')
    .post(async (req, res) => {
      const { email, password } = req.body;
      try {
        const userDoc = await User.findOne({ email });
        if (userDoc) {
          if (await User.comparePasswords(password, userDoc.passwordHash)) {
            const { passwordHash, ...user } = userDoc.toObject();
            try {
              const accessToken = await jwt.sign({ _id: user._id, email, rank: user.rank }, envConfig.AUTH_SECRET, {
                expiresIn: envConfig.AUTH_ACCESS_TOKEN_EXPIRATION,
              });
              return res.send({ user, accessToken });
            } catch (jwtError) {}
          }
        }
        return res.sendStatus(401);
      } catch (unknownError) {
        logger.error(unknownError);
        return res.sendStatus(500);
      }
    });

  router.route('/auth/verify-auth-token')
    .post(async (req, res) => {
      const { token } = req.body;
      try {
        const { _id } = await jwt.verify(token, envConfig.AUTH_SECRET);
        try {
          const user = await User.findById(_id).select('-passwordHash');
          return res.send(user);
        } catch (unknownError) {
          logger.error(unknownError);
          return res.sendStatus(500);
        }
      } catch (jwtError) {
        return res.sendStatus(401);
      }
    });

  router.route('/auth/send-verification-email')
    .post(async (req, res) => {
      const { email, locale = 'en' } = req.body;
      if (!email) return res.sendStatus(400);

      const expiresInMinutes = envConfig.AUTH_EMAIL_TOKEN_EXPIRATION_IN_MINUTES;
      const expiresInHours = expiresInMinutes / 60;
      try {
        const token = await jwt.sign({ email }, envConfig.AUTH_SECRET, { expiresIn: `${expiresInMinutes}m` });
        const link = encodeURI(`${envConfig.BASE_URL}/${locale}/verify-email?token=${token}`);
        try {
          const verificationMail = new Mail(email, locale, Mail.Templates.EMAIL_VERIFICATION, { link, expiresInHours });
          await verificationMail.send();
          return res.sendStatus(200);
        } catch (mailError) {
          return res.sendStatus(400);
        }
      } catch (unknownError) {
        logger.error(unknownError);
        return res.sendStatus(500);
      }
    });

  router.route('/auth/send-password-reset-email')
    .post(async (req, res) => {
      const { email, locale = 'en' } = req.body;
      const expiresInMinutes = envConfig.AUTH_EMAIL_TOKEN_EXPIRATION_IN_MINUTES;
      const expiresInHours = expiresInMinutes / 60;
      try {
        const token = await jwt.sign({ email }, envConfig.AUTH_SECRET, { expiresIn: `${expiresInMinutes}m` });
        const link = encodeURI(`${envConfig.BASE_URL}/${locale}/reset-password?token=${token}`);
        try {
          const passwordResetMail = new Mail(email, locale, Mail.Templates.PASSWORD_RESET, { link, expiresInHours });
          await passwordResetMail.send();
          return res.sendStatus(200);
        } catch (mailError) {
          return res.sendStatus(400);
        }
      } catch (unknownError) {
        logger.error(unknownError);
        return res.sendStatus(500);
      }
    });

  router.route('/auth/verify-email')
    .post(async (req, res) => {
      const { token } = req.body;
      try {
        const { email } = await jwt.verify(token, envConfig.AUTH_SECRET);
        try {
          await User.findOneAndUpdate({ email }, { isVerified: true });
          return res.sendStatus(200);
        } catch (unknownError) {
          logger.error(unknownError);
          return res.sendStatus(500);
        }
      } catch (jwtError) {
        return res.sendStatus(401);
      }
    });

  router.route('/auth/reset-password')
    .post(async (req, res) => {
      const { token, password } = req.body;
      try {
        const { email } = await jwt.verify(token, envConfig.AUTH_SECRET);
        try {
          await User.findOneAndUpdate({ email }, { passwordHash: await User.hashPassword(password) });
          return res.sendStatus(200);
        } catch (unknownError) {
          logger.error(unknownError);
          return res.sendStatus(500);
        }
      } catch (jwtError) {
        return res.sendStatus(401);
      }
    });

  return router;
};
