const User = require('../models/user');

module.exports = (router) => {
  router.route('/auth/create-auth-token')
    .post(async (req, res) => {
      const { email, password } = req.body;
      try {
        const userAndAuthToken = await User.getUserAndAuthToken(email, password);
        return res.send(userAndAuthToken);
      } catch (ex) {
        return res.status(401).send(ex);
      }
    });

  router.route('/auth/get-user-from-auth-token')
    .post(async (req, res) => {
      const { token } = req.body;
      try {
        const user = await User.getUserFromAuthToken(token);
        return res.send(user);
      } catch (ex) {
        return res.status(401).send(ex);
      }
    });

  router.route('/auth/send-verification-email')
    .post(async (req, res) => {
      const { email, locale } = req.body;
      try {
        const response = await User.sendVerificationEmail(email, locale);
        return res.send(response);
      } catch (ex) {
        return res.status(400).send(ex);
      }
    });

  router.route('/auth/send-password-reset-email')
    .post(async (req, res) => {
      const { email, locale } = req.body;
      try {
        const response = await User.sendPasswordResetEmail(email, locale);
        return res.send(response);
      } catch (ex) {
        return res.status(400).send(ex);
      }
    });

  router.route('/auth/verify-email')
    .post(async (req, res) => {
      const { token } = req.body;
      try {
        const response = await User.verifyEmail(token);
        return res.send(response);
      } catch (ex) {
        return res.status(401).send(ex);
      }
    });

  router.route('/auth/reset-password')
    .post(async (req, res) => {
      const { token, password } = req.body;
      try {
        const response = await User.resetPassword(token, password);
        return res.send(response);
      } catch (ex) {
        return res.status(401).send(ex);
      }
    });

  return router;
};
