const restifyErrors = require('restify-errors');

const DiaryDay = require('../models/DiaryDay');

const convertParamsToDocument = params => params;
const convertDocumentToResponse = doc => doc;

module.exports = server => {
	server.get('/api/diaryDays', async (req, res, next) => {
		const { year, month, day } = req.query;
		const docs = await DiaryDay.find({
			day,
			month,
			year,
		});
		res.send(docs.map(doc => convertDocumentToResponse(doc)));
		return next();
	});

	server.get('/api/diaryDays/:_id', async (req, res, next) => {
		const doc = await DiaryDay.findById(req.params._id);
		res.send(doc !== null ? convertDocumentToResponse(doc) : new restifyErrors.NotFoundError());
		return next();
	});

	server.put('/api/diaryDays', async (req, res, next) => {
		const doc = await DiaryDay.create(convertParamsToDocument(req.params));
		res.send(convertDocumentToResponse(doc));
		return next();
	});

	server.patch('/api/diaryDays/:_id', async (req, res, next) => {
		const { _id } = req.params;
		const result = await DiaryDay.updateOne({ _id }, convertParamsToDocument(req.params));
		res.send(result.n > 0 ? true : new restifyErrors.NotFoundError());
		return next();
	});

	server.del('/api/diaryDays/:_id', async (req, res, next) => {
		const { _id } = req.params;
		const result = await DiaryDay.deleteOne({ _id });
		res.send(result.n > 0 ? true : new restifyErrors.NotFoundError());
		return next();
	});
};
