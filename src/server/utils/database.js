const mongoose = require('mongoose');

const { MONGO_URI, IS_TEST } = require('../../../config/env');
const logger = require('./logger');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.Promise = Promise;

class Database {
  constructor () {
    this._connection = null;
  }

  async connect () {
    try {
      if (MONGO_URI) {
        ({ connection: this._connection } = await mongoose.connect(MONGO_URI));
        logger.success('Connected to MongoDB');
      } else {
        logger.info('MONGO_URI not set, skipping MongoDB connection');
      }
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
      logger.info('No active MongoDB connection, can\'t disconnect');
    }
  }

  async dropDb (yesImSure = false) {
    if (!IS_TEST) throw new Error('Dropping the database is only allowed in "test" mode');
    if (!yesImSure) return logger.info('You need to be sure about dropping the database');
    if (!this._connection) return logger.info('No active connection, can\'t drop database');

    await this._connection.dropDatabase();
  }
}

module.exports = new Database();
