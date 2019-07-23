const { Types } = require('mongoose');

const { AUTH_REGISTRATION_DISABLED } = require('../../../env.config');
const User = require('../models/user');

module.exports = (router) => {
  router.route('/users')
    .get(async (req, res) => {
      const docs = await User.find({}).select('-passwordHash');
      return res.send(docs);
    })
    .put(async (req, res) => {
      if (AUTH_REGISTRATION_DISABLED) {
        return res.sendStatus(403);
      }

      const { password, ...skeleton } = req.body;
      skeleton.passwordHash = await User.hashPassword(password);
      try {
        const doc = await User.create(skeleton);
        const { passwordHash, ...user } = doc.toObject();
        return res.send(user);
      } catch (ex) {
        if (ex.code === 11000) { return res.sendStatus(409); }
        return res.status(500).send(ex);
      }
    });

  router.route('/users/:_id')
    .get(async (req, res) => {
      const { _id } = req.params;
      if (Types.ObjectId.isValid(_id)) {
        const doc = await User.findById(_id).select('-passwordHash');
        if (doc) { return res.send(doc); }
      }
      return res.status(404).end();
    })
    .patch(async (req, res) => {
      const { _id } = req.params;
      if (Types.ObjectId.isValid(_id)) {
        const { password, email, ...skeleton } = req.body;
        if (password) { skeleton.passwordHash = await User.hashPassword(password); }
        const updatedDoc = await User.findOneAndUpdate({ _id }, skeleton, { new: true });
        if (updatedDoc) {
          const { passwordHash, ...updatedUser } = updatedDoc.toObject();
          return res.send(updatedUser);
        }
      }
      return res.status(404).end();
    })
    .delete(async (req, res) => {
      const { _id } = req.params;
      if (Types.ObjectId.isValid(_id)) {
        const doc = await User.findByIdAndRemove(_id);
        if (doc) { return res.send(); }
      }
      return res.status(404).end();
    });

  return router;
};
