const client = require('./client');
const food = require('./food');
const recipes = require('./recipes');

const routes = [
	food,
	recipes,

	client,
];

module.exports = routes;
