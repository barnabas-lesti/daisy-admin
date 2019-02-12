const restifyErrors = require('restify-errors');

const Food = require('../models/Food');

const foods = server => {
	server.post('/foods', async (req, res, next) => {
		const foodDoc = await Food.create(req.params);
		res.send(foodDoc);
		return next();
	});

	server.get('/foods', async (req, res, next) => {
		const foodDocs = await Food.find({});
		res.send(foodDocs);
		return next();
	});

	server.get('/foods/:name', async (req, res, next) => {
		const { name } = req.params;
		const foodDoc = await Food.findOne({ name });
		res.send(foodDoc !== null ? foodDoc : new restifyErrors.NotFoundError());
		return next();
	});

	server.put('/foods/:name', async (req, res, next) => {
		const { name } = req.params;
		const result = await Food.updateOne({ name }, req.params);
		res.send(result.n > 0 ? true : new restifyErrors.NotFoundError());
		return next();
	});

	server.del('/foods/:name', async (req, res, next) => {
		const { name } = req.params;
		const result = await Food.deleteOne({ name });
		res.send(result.n > 0 ? true : new restifyErrors.NotFoundError());
		return next();
	});
};

module.exports = foods;
