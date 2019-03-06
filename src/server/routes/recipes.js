const restifyErrors = require('restify-errors');

const Recipe = require('../models/Recipe');

const convertParamsToDocument = params => {
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

module.exports = server => {
	server.get('/api/recipes', async (req, res, next) => {
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
		res.send(docs.map(doc => convertDocumentToResponse(doc)));
		return next();
	});

	server.get('/api/recipes/:_id', async (req, res, next) => {
		const doc = await Recipe
			.findById(req.params._id)
			.populate('items.food')
			.exec();
		res.send(doc !== null ? convertDocumentToResponse(doc) : new restifyErrors.NotFoundError());
		return next();
	});

	server.put('/api/recipes', async (req, res, next) => {
		const doc = await Recipe.create(convertParamsToDocument(req.params));
		res.send(convertDocumentToResponse(doc));
		return next();
	});

	server.patch('/api/recipes/:_id', async (req, res, next) => {
		const { _id } = req.params;
		const result = await Recipe.updateOne({ _id }, convertParamsToDocument(req.params));
		res.send(result.n > 0 ? true : new restifyErrors.NotFoundError());
		return next();
	});

	server.del('/api/recipes/:_id', async (req, res, next) => {
		const { _id } = req.params;
		const result = await Recipe.deleteOne({ _id });
		res.send(result.n > 0 ? true : new restifyErrors.NotFoundError());
		return next();
	});
};
