const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
	description: {
		trim: true,
		type: String,
	},
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
	name: {
		trim: true,
		type: String,
	},
}, {
	id: false,
	toJSON: { versionKey: false },
	toObject: { versionKey: false },
});

module.exports = mongoose.model('Recipe', recipeSchema);
