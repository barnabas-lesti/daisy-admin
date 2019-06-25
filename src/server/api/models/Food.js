const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
	description: {
		trim: true,
		type: String,
	},
	name: {
		trim: true,
		type: String,
	},
	nutrients: {
		calories: {
			value: {
				default: 0,
				type: Number,
			},
		},
		carbs: {
			value: {
				default: 0,
				type: Number,
			},
		},
		energy: {
			value: {
				default: 0,
				type: Number,
			},
		},
		fat: {
			value: {
				default: 0,
				type: Number,
			},
		},
		fiber: {
			value: {
				default: 0,
				type: Number,
			},
		},
		protein: {
			value: {
				default: 0,
				type: Number,
			},
		},
		salt: {
			value: {
				default: 0,
				type: Number,
			},
		},
		saturatedFat: {
			value: {
				default: 0,
				type: Number,
			},
		},
		sugar: {
			value: {
				default: 0,
				type: Number,
			},
		},
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
}, {
	id: false,
	toJSON: {
		versionKey: false,
		virtuals: true,
	},
	toObject: {
		versionKey: false,
		virtuals: true,
	},
});

for (const nutrientKey of Object.keys(foodSchema.obj.nutrients)) {
	foodSchema.virtual(`nutrients.${nutrientKey}.servingMultiplier`).get(function () {
		const servingValue = this.serving.value;
		return servingValue === 0 ? 0 : this.nutrients[nutrientKey].value / servingValue;
	});
}

module.exports = mongoose.model('Food', foodSchema);
