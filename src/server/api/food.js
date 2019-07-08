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
      const doc = await Food.findById(req.params._id);
      if (!doc) {
        res.status(404).end();
      }
      return res.send(doc);
    })
    .patch(async (req, res) => {
      const skeleton = req.body;
      const updatedDoc = await Food.findOneAndUpdate({ _id: req.params._id }, skeleton, { new: true });
      if (!updatedDoc) {
        res.status(404).end();
      }
      return res.send(updatedDoc);
    })
    .delete(async (req, res) => {
      const doc = await Food.findByIdAndRemove(req.params._id);
      if (!doc) {
        return res.status(404).end();
      }
      return res.send(doc);
    });

  return router;
};
