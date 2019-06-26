const mongoose = require('mongoose');
const config = require('./common/config');

export const connectToDatabase = () => {
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useNewUrlParser', true);
	mongoose.Promise = Promise;
	return mongoose.connect(config.private.MONGO_URI);
};
