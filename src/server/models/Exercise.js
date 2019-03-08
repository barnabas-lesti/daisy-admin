const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
	activity: {
		duration: {
			value: {
				default: 0,
				type: Number,
			},
		},
		reps: {
			value: {
				default: 0,
				type: Number,
			},
		},
	},
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

exerciseSchema.virtual('calorieBurn.activityDurationMultiplier').get(function () {
	const duration = this.activity.duration.value;
	return duration === 0 ? 0 : this.calorieBurn.value / duration;
});

exerciseSchema.virtual('calorieBurn.activityRepMultiplier').get(function () {
	const reps = this.activity.reps.value;
	return reps === 0 ? 0 : this.calorieBurn.value / reps;
});

module.exports = mongoose.model('Exercise', exerciseSchema);
