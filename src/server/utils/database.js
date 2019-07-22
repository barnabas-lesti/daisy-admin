const mongoose = require('mongoose');

const envConfig = require('../../../env.config');
const logger = require('./logger');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.Promise = Promise;

class Database {
  constructor (mongoUri = envConfig.MONGO_URI) {
    this._mongoUri = mongoUri;
  }

  async connect () {
    try {
      await mongoose.connect(this._mongoUri);
      logger.success('Connected to MongoDB');
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };
}

module.exports = Database;
