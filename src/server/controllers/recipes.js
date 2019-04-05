const Recipe = require('../models/Recipe');

const convertReqBodyToDocument = params => {
	const items = params.items;
	if (items && items.length) {
		params.items = items.map(item => {
			item.food = item.food._id;
			return item;
		});
	}
	return params;
};

const convertDocumentToResponse = doc => doc;

module.exports = router => {
	router.route('/recipes')
		.get(async (req, res, next) => {
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
			res.locals.data = docs.map(doc => convertDocumentToResponse(doc));
			return next();
		})
		.put(async (req, res, next) => {
			const { _id } = await Recipe.create(convertReqBodyToDocument(req.body));
			const doc = await Recipe
				.findById(_id)
				.populate('items.food')
				.exec();
			res.locals.data = convertDocumentToResponse(doc);
			return next();
		});

	router.route('/recipes/:_id')
		.get(async (req, res, next) => {
			const doc = await Recipe
				.findById(req.params._id)
				.populate('items.food')
				.exec();
			res.locals.data = convertDocumentToResponse(doc);
			return next();
		})
		.patch(async (req, res, next) => {
			const result = await Recipe.updateOne({ _id: req.params._id }, convertReqBodyToDocument(req.body));
			res.locals.data = result.n > 0 ? true : null;
			return next();
		})
		.delete(async (req, res, next) => {
			const result = await Recipe.deleteOne({ _id: req.params._id });
			res.locals.data = result.n > 0 ? true : null;
			return next();
		});

	return router;
};
