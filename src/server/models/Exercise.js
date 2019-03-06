const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
	activity: {
		duration: {
			unit: {
				default: 'min',
				type: String,
			},
			value: {
				default: 0,
				type: Number,
			},
		},
		reps: {
			unit: {
				default: 'rep',
				type: String,
			},
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
	description: String,
	name: String,
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

exerciseSchema.virtual('macros.calories.activityDurationMultiplier').get(function () {
	const duration = this.activity.duration.value;
	return duration === 0 ? 0 : this.calorieBurn.value / duration;
});

exerciseSchema.virtual('macros.calories.activityRepMultiplier').get(function () {
	const reps = this.activity.reps.value;
	return reps === 0 ? 0 : this.calorieBurn.value / reps;
});

module.exports = mongoose.model('Exercise', exerciseSchema);
