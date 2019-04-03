const Food = require('../models/Food');

const convertReqBodyToDocument = params => params;
const convertDocumentToResponse = doc => doc;

module.exports = router => {
	router.route('/food')
		.get(async (req, res, next) => {
			const { searchQuery } = req.query;
			const findConditions = {};
			if (searchQuery) {
				findConditions.name = new RegExp(
					searchQuery
						.split(',')
						.map(fragment => fragment.trim())
						.join('|'),
					'i'
				);
			}
			const docs = await Food.find(findConditions);
			res.locals.data = docs.map(doc => convertDocumentToResponse(doc));
			return next();
		})
		.put(async (req, res, next) => {
			const doc = await Food.create(convertReqBodyToDocument(req.body));
			res.locals.data = convertDocumentToResponse(doc);
			return next();
		});

	router.route('/food/:_id')
		.get(async (req, res, next) => {
			const doc = await Food.findById(req.params._id);
			res.locals.data = convertDocumentToResponse(doc);
			return next();
		})
		.patch(async (req, res, next) => {
			const result = await Food.updateOne({ _id: req.params._id }, convertReqBodyToDocument(req.body));
			res.locals.data = result.n > 0 ? true : null;
			return next();
		})
		.delete(async (req, res, next) => {
			const result = await Food.deleteOne({ _id: req.params._id });
			res.locals.data = result.n > 0 ? true : null;
			return next();
		});

	return router;
};
