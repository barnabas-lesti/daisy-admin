const restifyErrors = require('restify-errors');

const Food = require('../models/Food');

const convertParamsToDocument = params => params;
const convertDocumentToResponse = doc => doc;

const food = server => {
	server.get('/api/food', async (req, res, next) => {
		const { searchQuery = '' } = req.query;
		const nameRegex = new RegExp(
			searchQuery
				.split(',')
				.map(fragment => fragment.trim())
				.join('|'),
			'i'
		);
		const foodDocs = await Food.find({ name: nameRegex });
		res.send(foodDocs.map(doc => convertDocumentToResponse(doc)));
		return next();
	});

	server.get('/api/food/:_id', async (req, res, next) => {
		const foodDoc = await Food.findById(req.params._id);
		res.send(foodDoc !== null ? convertDocumentToResponse(foodDoc) : new restifyErrors.NotFoundError());
		return next();
	});

	server.put('/api/food', async (req, res, next) => {
		const foodDoc = await Food.create(convertParamsToDocument(req.params));
		res.send(convertDocumentToResponse(foodDoc));
		return next();
	});

	server.patch('/api/food/:_id', async (req, res, next) => {
		const { _id } = req.params;
		const result = await Food.updateOne({ _id }, convertParamsToDocument(req.params));
		res.send(result.n > 0 ? true : new restifyErrors.NotFoundError());
		return next();
	});

	server.del('/api/food/:_id', async (req, res, next) => {
		const { _id } = req.params;
		const result = await Food.deleteOne({ _id });
		res.send(result.n > 0 ? true : new restifyErrors.NotFoundError());
		return next();
	});
};

module.exports = food;
