const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
	macros: {
		calories: {
			default: 0,
			type: Number,
		},
		carbs: {
			default: 0,
			type: Number,
		},
		fat: {
			default: 0,
			type: Number,
		},
		protein: {
			default: 0,
			type: Number,
		},
	},
	name: {
		required: true,
		type: String,
	},
	serving: {
		unit: {
			default: 'g',
			type: String,
		},
		value: {
			default: 0,
			type: Number,
		},
	},
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
