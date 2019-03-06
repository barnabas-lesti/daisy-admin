const restifyErrors = require('restify-errors');

const Exercise = require('../models/Exercise');

const convertParamsToDocument = params => params;
const convertDocumentToResponse = doc => doc;

module.exports = server => {
	server.get('/api/exercises', async (req, res, next) => {
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
		res.send(docs.map(doc => convertDocumentToResponse(doc)));
		return next();
	});

	server.get('/api/exercises/:_id', async (req, res, next) => {
		const doc = await Exercise.findById(req.params._id);
		res.send(doc !== null ? convertDocumentToResponse(doc) : new restifyErrors.NotFoundError());
		return next();
	});

	server.put('/api/exercises', async (req, res, next) => {
		const doc = await Exercise.create(convertParamsToDocument(req.params));
		res.send(convertDocumentToResponse(doc));
		return next();
	});

	server.patch('/api/exercises/:_id', async (req, res, next) => {
		const { _id } = req.params;
		const result = await Exercise.updateOne({ _id }, convertParamsToDocument(req.params));
		res.send(result.n > 0 ? true : new restifyErrors.NotFoundError());
		return next();
	});

	server.del('/api/exercises/:_id', async (req, res, next) => {
		const { _id } = req.params;
		const result = await Exercise.deleteOne({ _id });
		res.send(result.n > 0 ? true : new restifyErrors.NotFoundError());
		return next();
	});
};
