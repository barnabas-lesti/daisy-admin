const mongoose = require('mongoose');
const restify = require('restify');
const restifyPromise = require('restify-await-promise');
const restifyLogger = require('restify-logger');

const config = require('./common/config');
const logger = require('./common/logger');
const cors = require('./middlewares/cors');
const routes = require('./routes');

const server = restify.createServer();

restifyPromise.install(server);

server.use(restifyLogger('tiny'));
server.use(cors());
server.use(restify.plugins.bodyParser({ mapParams: true }));

for (const route of routes) {
	route(server);
}

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.Promise = Promise;

mongoose.connect(config.MONGO_URI);

server.listen(config.PORT, () => {
	logger.info(`API Server started: ${ server.url }`);
});
