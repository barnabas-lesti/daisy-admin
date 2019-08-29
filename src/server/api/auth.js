const { User } = require('../models');
const { Mail, logger } = require('../utils');

const envConfig = require('../../../config/env');

module.exports = (router) => {
  router.route('/auth/register')
    .post(async (req, res) => {
      if (envConfig.REGISTRATION_DISABLED) return res.sendStatus(403);

      const { email, password, fullName } = req.body;
      if (!email || !password || !fullName) return res.sendStatus(400);

      try {
        const passwordHash = await User.hashPassword(password);
        await User.create({ email, passwordHash, fullName });
        return res.sendStatus(200);
      } catch (error) {
        if (error.code === 11000) return res.sendStatus(409);

        logger.error(error);
        return res.sendStatus(500);
      }
    });

  router.route('/auth/sign-in')
    .post(async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) return res.sendStatus(400);

      try {
        const userDoc = await User.findOne({ email });
        if (userDoc && await User.comparePasswords(password, userDoc.passwordHash)) {
          const { accessToken, refreshToken } = await User.createAccessAndRefreshTokens(userDoc);
          res.set('Authorization', User.createAuthorizationHeaderString(accessToken, refreshToken));
          return res.sendStatus(200);
        }

        return res.sendStatus(401);
      } catch (error) {
        logger.error(error);
        return res.sendStatus(500);
      }
    });

  router.route('/auth/verify')
    .post((req, res) => {
      return res.send(req.user);
    });

  // router.route('/auth/send-registration-email')
  //   .post(async (req, res) => {
  //     if (envConfig.REGISTRATION_DISABLED) return res.sendStatus(403);

  //     const { email, password, fullName, locale = envConfig.I18N_DEFAULT_LOCALE } = req.body;
  //     if (!email || !password || !fullName) return res.sendStatus(400);

  //     const user = await User.findOne({ email });
  //     if (user) return res.sendStatus(409);

  //     const expiresInMinutes = envConfig.EMAIL_TOKEN_EXPIRATION_IN_MINUTES;
  //     try {
  //       const token = await User.createRegistrationToken({ email, password, fullName });
  //       const link = encodeURI(`${envConfig.BASE_URL}/${locale}/register?token=${token}`);
  //       try {
  //         const verificationMail = new Mail(email, locale, Mail.Templates.REGISTRATION, { link, expiresInMinutes });
  //         await verificationMail.send();
  //         return res.sendStatus(200);
  //       } catch (mailError) {
  //         return res.sendStatus(400);
  //       }
  //     } catch (unknownError) {
  //       logger.error(unknownError);
  //       return res.sendStatus(500);
  //     }
  //   });

  // router.route('/auth/send-password-reset-email')
  //   .post(async (req, res) => {
  //     const { email, locale = 'en' } = req.body;
  //     if (!email) return res.sendStatus(400);

  //     const user = await User.findOne({ email });
  //     if (!user) return res.sendStatus(404);

  //     const expiresInMinutes = envConfig.EMAIL_TOKEN_EXPIRATION_IN_MINUTES;
  //     try {
  //       const token = await User.createPasswordResetToken({ email });
  //       const link = encodeURI(`${envConfig.BASE_URL}/${locale}/forgot-password?token=${token}`);
  //       try {
  //         const passwordResetMail = new Mail(email, locale, Mail.Templates.PASSWORD_RESET, { link, expiresInMinutes });
  //         await passwordResetMail.send();
  //         return res.sendStatus(200);
  //       } catch (mailError) {
  //         return res.sendStatus(400);
  //       }
  //     } catch (unknownError) {
  //       logger.error(unknownError);
  //       return res.sendStatus(500);
  //     }
  //   });

  // router.route('/auth/password')
  //   .patch(async (req, res) => {
  //     const { token, password } = req.body;
  //     if (!token || !password) return res.sendStatus(400);

  //     let email;
  //     try {
  //       ({ email } = await jwt.verify(token, envConfig.AUTH_SECRET));
  //       if (!email) return res.sendStatus(400);
  //     } catch (jwtError) {
  //       return res.sendStatus(401);
  //     }

  //     const user = await User.findOne({ email });
  //     if (!user) return res.sendStatus(404);

  //     try {
  //       await User.findOneAndUpdate({ email }, { passwordHash: await User.hashPassword(password) });
  //       return res.sendStatus(200);
  //     } catch (unknownError) {
  //       logger.error(unknownError);
  //       return res.sendStatus(500);
  //     }
  //   });

  // router.route('/auth/profile')
  //   .patch(async (req, res) => {
  //     const { user, body } = req;
  //     if (!user) return res.sendStatus(401);
  //     if (!body.fullName) return res.sendStatus(400);

  //     try {
  //       await User.findOneAndUpdate({ _id: user._id }, body);
  //       return res.sendStatus(200);
  //     } catch (unknownError) {
  //       logger.error(unknownError);
  //       return res.sendStatus(500);
  //     }
  //   });

  return router;
};
