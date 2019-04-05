const contentService = require('../services/contentService');

module.exports = router => {
	router.route('/i18n/:locale')
		.get(async (req, res, next) => {
			const messages = await contentService.getMessagesByLocale(req.params.locale);
			res.locals.data = messages;
			return next();
		});

	return router;
};
