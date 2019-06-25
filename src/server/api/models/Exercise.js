const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
	calorieBurn: {
		value: {
			default: 0,
			type: Number,
		},
	},
	description: {
		trim: true,
		type: String,
	},
	duration: {
		value: {
			default: 0,
			type: Number,
		},
	},
	name: {
		trim: true,
		type: String,
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

exerciseSchema.virtual('calorieBurn.durationMultiplier').get(function () {
	const duration = this.duration.value;
	return duration === 0 ? 0 : this.calorieBurn.value / duration;
});

module.exports = mongoose.model('Exercise', exerciseSchema);
