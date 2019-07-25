const { Types } = require('mongoose');

const { AUTH_REGISTRATION_DISABLED } = require('../../../env.config');
const User = require('../models/user');
const { logger } = require('../utils');

module.exports = (router) => {
  router.route('/users')
    .get(async (req, res) => {
      const docs = await User.find({}).select('-passwordHash');
      return res.send(docs);
    })
    .put(async (req, res) => {
      if (AUTH_REGISTRATION_DISABLED) return res.sendStatus(403);

      const { email, password, profileImageUrl, nickname } = req.body;
      if (!email || !password) return res.sendStatus(400);

      let passwordHash = await User.hashPassword(password);
      try {
        const doc = await User.create({ email, passwordHash, profileImageUrl, nickname });
        let user;
        ({ passwordHash, ...user } = doc.toObject());
        return res.send(user);
      } catch (ex) {
        if (ex.code === 11000) return res.sendStatus(409);

        logger.error(ex);
        return res.status(500).send(ex);
      }
    });

  router.route('/users/:_id')
    .get(async (req, res) => {
      const { _id } = req.params;
      if (!Types.ObjectId.isValid(_id)) return res.sendStatus(404);

      const doc = await User.findById(_id).select('-passwordHash');
      if (!doc) return res.sendStatus(404);

      return res.send(doc);
    })
    .patch(async (req, res) => {
      const { user, params: { _id } } = req;
      if (!user) return res.sendStatus(401);

      if (!Types.ObjectId.isValid(_id)) return res.sendStatus(404);

      const doc = await User.findById(_id);
      if (!doc) return res.sendStatus(404);

      if (user.rank !== 'admin' && _id !== user._id) return res.sendStatus(403);

      const { password, email, ...skeleton } = req.body;
      if (password) skeleton.passwordHash = await User.hashPassword(password);
      const updatedDoc = await User.findOneAndUpdate({ _id }, skeleton, { new: true });
      const { passwordHash, ...updatedUser } = updatedDoc.toObject();
      return res.send(updatedUser);
    })
    .delete(async (req, res) => {
      const { user, params: { _id } } = req;
      if (!user) return res.sendStatus(401);
      if (user.rank !== 'admin' && _id !== user._id) return res.sendStatus(403);

      if (!Types.ObjectId.isValid(_id)) return res.sendStatus(404);

      const doc = await User.findById(_id);
      if (!doc) return res.sendStatus(404);

      await User.deleteOne({ _id });
      return res.sendStatus(200);
    });

  return router;
};
