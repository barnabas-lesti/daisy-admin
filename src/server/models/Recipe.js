const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
	description: String,
	items: {
		default: [],
		type: [
			{
				food: {
					ref: 'Food',
					type: mongoose.SchemaTypes.ObjectId,
				},
				serving: {
					value: {
						default: 0,
						type: Number,
					},
				},
			},
		],
	},
	name: String,
}, {
	id: false,
	toJSON: { versionKey: false },
	toObject: { versionKey: false },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
