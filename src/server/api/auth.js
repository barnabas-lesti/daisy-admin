const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { Mail, logger } = require('../utils');

const {
  BASE_URL,
  AUTH_SECRET,
  AUTH_REGISTRATION_DISABLED,
  AUTH_EMAIL_TOKEN_EXPIRATION_IN_MINUTES,
} = require('../../../env.config');

module.exports = (router) => {
  router.route('/auth/send-registration-email')
    .post(async (req, res) => {
      const { email, password, nickname, locale = 'en' } = req.body;
      if (!email || !password || !nickname) return res.sendStatus(400);

      const expiresInMinutes = AUTH_EMAIL_TOKEN_EXPIRATION_IN_MINUTES;
      const expiresInHours = expiresInMinutes / 60;
      try {
        const token = await jwt.sign({ email }, AUTH_SECRET, { expiresIn: `${expiresInMinutes}m` });
        const link = encodeURI(`${BASE_URL}/${locale}/register?token=${token}`);
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

  router.route('/auth/register')
    .post(async (req, res) => {
      if (AUTH_REGISTRATION_DISABLED) return res.sendStatus(403);

      const { token } = req.body;
      if (!token) return res.sendStatus(400);

      let email, nickname, password;
      try {
        ({ email, nickname, password } = await jwt.verify(token, AUTH_SECRET));
      } catch (jwtError) {
        return res.sendStatus(401);
      }

      if (!email || !password || !nickname) return res.sendStatus(400);

      try {
        // await User.findOneAndUpdate({ email }, { isVerified: true }); TODO: create new user
        return res.sendStatus(200);
      } catch (unknownError) {
        logger.error(unknownError);
        return res.sendStatus(500);
      }
    });

  router.route('/auth/sign-in')
    .post(async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) return res.sendStatus(400);

      try {
        const userDoc = await User.findOne({ email });
        if (userDoc) {
          if (await User.comparePasswords(password, userDoc.passwordHash)) {
            const { passwordHash, ...user } = userDoc.toObject();
            const accessToken = await User.createAccessToken(user);
            return res.send({ user, accessToken });
          }
        }
        return res.sendStatus(401);
      } catch (unknownError) {
        logger.error(unknownError);
        return res.sendStatus(500);
      }
    });

  router.route('/auth/verify-access-token')
    .post(async (req, res) => {
      const { token } = req.body;
      if (!token) return res.sendStatus(400);

      try {
        const { email } = await jwt.verify(token, AUTH_SECRET);
        try {
          const doc = await User.findOne({ email });
          if (!doc) return res.sendStatus(401);

          const { passwordHash, ...user } = doc.toObject();
          return res.send(user);
        } catch (unknownError) {
          logger.error(unknownError);
          return res.sendStatus(500);
        }
      } catch (jwtError) {
        return res.sendStatus(401);
      }
    });

  router.route('/auth/send-password-reset-email')
    .post(async (req, res) => {
      const { email, locale = 'en' } = req.body;
      if (!email) return res.sendStatus(400);

      const expiresInMinutes = AUTH_EMAIL_TOKEN_EXPIRATION_IN_MINUTES;
      const expiresInHours = expiresInMinutes / 60;
      try {
        const token = await jwt.sign({ email }, AUTH_SECRET, { expiresIn: `${expiresInMinutes}m` });
        const link = encodeURI(`${BASE_URL}/${locale}/reset-password?token=${token}`);
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

  router.route('/auth/reset-password')
    .post(async (req, res) => {
      const { token, password } = req.body;
      if (!token || !password) return res.sendStatus(400);

      try {
        const { email } = await jwt.verify(token, AUTH_SECRET);
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
