const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
	amount: Number,
	calories: Number,
	label: String,
	macros: {
		carbs: Number,
		fat: Number,
		protein: Number,
	},
	name: {
		lowercase: true,
		required: true,
		type: String,
		unique: true,
	},
	unit: String,
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
