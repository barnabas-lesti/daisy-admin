const mongoose = require('mongoose');

const diaryDaySchema = new mongoose.Schema({
	calculatorItems: {
		default: [],
		type: [ Object ],
	},
	day: Number,
	month: Number,
	notes: {
		trim: true,
		type: String,
	},
	year: Number,
}, {
	id: false,
	toJSON: { versionKey: false },
	toObject: { versionKey: false },
});

module.exports = mongoose.model('DiaryDay', diaryDaySchema);
