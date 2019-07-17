const consola = require('consola');
const mongoose = require('mongoose');

const envConfig = require('../../env.config');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.Promise = Promise;

module.exports = async (mongoUri = envConfig.MONGO_URI) => {
  try {
    await mongoose.connect(mongoUri);
    consola.ready({ message: 'Connected to MongoDB', badge: true });
  } catch (error) {
    consola.error(error);
    throw error;
  }
};
