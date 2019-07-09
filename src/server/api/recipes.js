const Recipe = require('../models/Recipe');

const convertReqBodyToDocument = (params) => {
  const items = params.items;
  if (items && items.length) {
    params.items = items.map((item) => {
      item.food = item.food._id;
      return item;
    });
  }
  return params;
};

const convertDocumentToResponse = (doc) => {
  doc.items = doc.items.filter(item => item.food !== null);
  return doc;
};

module.exports = (router) => {
  router.route('/recipes')
    .get(async (req, res) => {
      const { search = '' } = req.query;
      const nameRegex = new RegExp(
        search
          .split(',')
          .map(fragment => fragment.trim())
          .join('|'),
        'i'
      );
      const docs = await Recipe.find({ 'content.name': nameRegex });
      return res.send(docs.map(doc => convertDocumentToResponse(doc)));
    })
    .put(async (req, res) => {
      const { _id } = await Recipe.create(convertReqBodyToDocument(req.body));
      const doc = await Recipe.findById(_id);
      return res.send(convertDocumentToResponse(doc));
    });

  router.route('/recipes/:_id')
    .get(async (req, res) => {
      const doc = await Recipe.findById(req.params._id);
      if (!doc) {
        return res.status(404).end();
      }
      return res.send(convertDocumentToResponse(doc));
    })
    .patch(async (req, res) => {
      const updatedDoc = await Recipe.findOneAndUpdate({ _id: req.params._id }, convertReqBodyToDocument(req.body), { new: true });
      if (!updatedDoc) {
        return res.status(404).end();
      }
      return res.send(convertDocumentToResponse(updatedDoc));
    })
    .delete(async (req, res) => {
      const doc = await Recipe.findByIdAndRemove(req.params._id);
      if (!doc) {
        return res.status(404).end();
      }
      return res.send(convertDocumentToResponse(doc));
    });

  return router;
};
