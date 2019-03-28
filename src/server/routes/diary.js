const restifyErrors = require('restify-errors');

const DiaryDay = require('../models/DiaryDay');

const convertParamsToDocument = params => {
	// const items = params.items;
	// if (items && items.length) {
	// 	params.items = items.map(item => {
	// 		item.food = item.food._id;
	// 		return item;
	// 	});
	// }
	return params;
};

const convertDocumentToResponse = doc => doc;

module.exports = server => {
	server.get('/api/diary', async (req, res, next) => {
		const {
			day,
			month,
			year,
		} = req.query;

		const query = {};
		if (day) {
			query.day = day;
		}
		if (month) {
			query.month = month;
		}
		if (year) {
			query.year = year;
		}

		const docs = await DiaryDay
			.find(query)
			.exec();
		res.send(docs.map(doc => convertDocumentToResponse(doc)));
		return next();
	});

	server.put('/api/diary', async (req, res, next) => {
		const { _id } = await DiaryDay.create(convertParamsToDocument(req.params));
		const doc = await DiaryDay
			.findById(_id)
			.exec();
		res.send(convertDocumentToResponse(doc));
		return next();
	});

	server.patch('/api/diary', async (req, res, next) => {
		const {
			day,
			month,
			year,
		} = req.query;
		const result = await DiaryDay.updateOne({
			day,
			month,
			year,
		}, convertParamsToDocument(req.params));
		res.send(result.n > 0 ? true : new restifyErrors.NotFoundError());
		return next();
	});

	server.del('/api/diary', async (req, res, next) => {
		const {
			day,
			month,
			year,
		} = req.query;
		const result = await DiaryDay.deleteOne({
			day,
			month,
			year,
		});
		res.send(result.n > 0 ? true : new restifyErrors.NotFoundError());
		return next();
	});
};
