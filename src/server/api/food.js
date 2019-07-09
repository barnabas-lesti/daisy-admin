const { Types } = require('mongoose');

const Food = require('../models/Food');

module.exports = (router) => {
  router.route('/food')
    .get(async (req, res) => {
      const { search } = req.query;
      const query = {};
      if (search) {
        query['content.name'] = new RegExp(
          search
            .split(',')
            .map(fragment => fragment.trim())
            .join('|'),
          'i'
        );
      }
      const docs = await Food.find(query);
      return res.send(docs);
    })
    .put(async (req, res) => {
      const skeleton = req.body;
      const doc = await Food.create(skeleton);
      return res.send(doc);
    });

  router.route('/food/:_id')
    .get(async (req, res) => {
      const { _id } = req.params;
      if (Types.ObjectId.isValid(_id)) {
        const doc = await Food.findById(_id);
        if (doc) { return res.send(doc); }
      }
      return res.status(404).end();
    })
    .patch(async (req, res) => {
      const { _id } = req.params;
      if (Types.ObjectId.isValid(_id)) {
        const updatedDoc = await Food.findOneAndUpdate({ _id }, req.body, { new: true });
        if (updatedDoc) { return res.send(updatedDoc); }
      }
      return res.status(404).end();
    })
    .delete(async (req, res) => {
      const { _id } = req.params;
      if (Types.ObjectId.isValid(_id)) {
        const doc = await Food.findByIdAndRemove(_id);
        if (doc) { return res.send(doc); }
      }
      return res.status(404).end();
    });

  return router;
};
