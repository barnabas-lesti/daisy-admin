const mongoose = require('mongoose');

const envConfig = require('../../../env.config');
const logger = require('./logger');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.Promise = Promise;

class Database {
  constructor (mongoUri = envConfig.MONGO_URI) {
    this._connection = null;
    this._mongoUri = mongoUri;
  }

  async connect () {
    try {
      ({ connection: this._connection } = await mongoose.connect(this._mongoUri));
      logger.success('Connected to MongoDB');
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };

  async disconnect () {
    if (this._connection) {
      await this._connection.close();
      logger.success('Disconnected from MongoDB');
    } else {
      logger.info("No active MongoDB connection, can't disconnect");
    }
  }
}

module.exports = Database;
