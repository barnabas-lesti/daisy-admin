const Exercise = require('../models/Exercise');

module.exports = (router) => {
	router.route('/exercises')
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
			const docs = await Exercise.find(query);
			return res.send(docs);
		})
		.put(async (req, res) => {
			const skeleton = req.body;
			const doc = await Exercise.create(skeleton);
			return res.send(doc);
		});

	router.route('/exercises/:_id')
		.get(async (req, res) => {
			const doc = await Exercise.findById(req.params._id);
			if (!doc) {
				res.status(404).end();
			}
			return res.send(doc);
		})
		.patch(async (req, res) => {
			const skeleton = req.body;
			const updatedDoc = await Exercise.findOneAndUpdate({ _id: req.params._id }, skeleton, { new: true });
			if (!updatedDoc) {
				res.status(404).end();
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
