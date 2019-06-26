const Recipe = require('../models/recipe');

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

module.exports = (router) => {
	router.route('/recipes')
		.get(async (req, res) => {
			const { searchQuery = '' } = req.query;
			const nameRegex = new RegExp(
				searchQuery
					.split(',')
					.map(fragment => fragment.trim())
					.join('|'),
				'i'
			);
			const docs = await Recipe
				.find({ name: nameRegex })
				.populate('items.food')
				.exec();
			return res.send(docs);
		})
		.put(async (req, res) => {
			const { _id } = await Recipe.create(convertReqBodyToDocument(req.body));
			const doc = await Recipe
				.findById(_id)
				.populate('items.food')
				.exec();
			return res.send(doc);
		});

	router.route('/recipes/:_id')
		.get(async (req, res, next) => {
			const doc = await Recipe
				.findById(req.params._id)
				.populate('items.food')
				.exec();
			if (!doc) {
				return res.status(404).end();
			}
			return res.send(doc);
		})
		.patch(async (req, res, next) => {
			const updatedDoc = await Recipe.findOneAndUpdate({ _id: req.params._id }, convertReqBodyToDocument(req.body), { new: true });
			if (!updatedDoc) {
				return res.status(404).end();
			}
			return res.send(updatedDoc);
		})
		.delete(async (req, res, next) => {
			const doc = await Recipe.findByIdAndRemove(req.params._id);
			if (!doc) {
				return res.status(404).end();
			}
			return res.send(doc);
		});

	return router;
};
