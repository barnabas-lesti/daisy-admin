const Exercise = require('../models/Exercise');

module.exports = (router) => {
	router.route('/exercises')
		.get(async (req, res) => {
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
			return res.send(docs);
		})
		.put(async (req, res) => {
			const doc = await Exercise.create(req.body);
			return res.send(doc);
		});

	router.route('/exercises/:_id')
		.get(async (req, res) => {
			const doc = await Exercise.findById(req.params._id);
			if (!doc) {
				return res.status(404).end();
			}
			return res.send(doc);
		})
		.patch(async (req, res, next) => {
			const updatedDoc = await Exercise.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
			if (!updatedDoc) {
				return res.status(404).end();
			}
			return res.send(updatedDoc);
		})
		.delete(async (req, res) => {
			const doc = await Exercise.findByIdAndRemove(req.params._id);
			if (!doc) {
				return res.status(404).end();
			}
			return res.send(doc);
		});

	return router;
};
