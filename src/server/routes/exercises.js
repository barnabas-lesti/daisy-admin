const Exercise = require('../models/Exercise');

const convertReqBodyToDocument = params => params;
const convertDocumentToResponse = doc => doc;

module.exports = router => {
	router.route('/exercises')
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
			const docs = await Exercise.find(findConditions);
			res.locals.data = docs.map(doc => convertDocumentToResponse(doc));
			return next();
		})
		.put(async (req, res, next) => {
			const doc = await Exercise.create(convertReqBodyToDocument(req.params));
			res.locals.data = convertDocumentToResponse(doc);
			return next();
		});

	router.route('/exercises/:_id')
		.get(async (req, res, next) => {
			const doc = await Exercise.findById(req.params._id);
			res.locals.data = convertDocumentToResponse(doc);
			return next();
		})
		.patch(async (req, res, next) => {
			const result = await Exercise.updateOne({ _id: req.params._id }, convertReqBodyToDocument(req.params));
			res.locals.data = result.n > 0 ? true : null;
			return next();
		})
		.delete(async (req, res, next) => {
			const result = await Exercise.deleteOne({ _id: req.params._id });
			res.locals.data = result.n > 0 ? true : null;
			return next();
		});

	return router;
};
