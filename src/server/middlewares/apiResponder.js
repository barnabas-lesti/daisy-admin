module.exports = () => (req, res) => {
	const { data, error } = res.locals;

	if (error) {
		res.status(500).json(error);
		return;
	} else if (data !== undefined && data !== null) {
		res.status(200).json(data);
		return;
	} else {
		res.status(404).json();
		return;
	}
};
