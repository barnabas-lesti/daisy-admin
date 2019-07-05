const consola = require('consola');
const mongoose = require('mongoose');

const config = require('../../app.config');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.Promise = Promise;

module.exports = async () => {
	try {
		await mongoose.connect(config.env.MONGO_URI);
		consola.ready({ message: 'Connected to MongoDB', badge: true });
	} catch (error) {
		consola.error(error);
		throw error;
	}
};
