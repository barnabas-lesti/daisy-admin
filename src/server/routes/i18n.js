const contentService = require('../services/contentService');

module.exports = server => {
	server.get('/api/i18n/:locale', async (req, res, next) => {
		const messages = await contentService.getMessagesByLocale(req.params.locale);
		res.send(messages);
		return next();
	});
};
