const contentService = require('../services/contentService');

module.exports = server => {
	server.get('/api/i18n', async (req, res, next) => {
		const {
			locale,
			locales,
		} = req.query;
		const messages = await (locale ? contentService.getMessagesByLocale(locale) : contentService.getMessagesByLocales(locales));
		res.send(messages);
		return next();
	});
};
