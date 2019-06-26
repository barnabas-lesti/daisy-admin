module.exports = (router) => {
	router.route('*').all((req, res) => res.status(404).end());
	return router;
};
