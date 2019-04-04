const mongoose = require('mongoose');

const config = require('./common/config');

class Database {
	constructor () {
		this._mongoose = mongoose;
		this._mongoose.set('useFindAndModify', false);
		this._mongoose.set('useCreateIndex', true);
		this._mongoose.set('useNewUrlParser', true);
		this._mongoose.Promise = Promise;
	}

	async connect () {
		this._mongoose.connect(config.MONGO_URI);
	}
}

module.exports = new Database();
