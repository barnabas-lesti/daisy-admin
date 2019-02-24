const mongoose = require('mongoose');
const restify = require('restify');
const restifyPromise = require('restify-await-promise');
const restifyCorsMiddleware = require('restify-cors-middleware');
const restifyLogger = require('restify-logger');
const serveStaticRestify = require('serve-static-restify');

const config = require('./common/config');
const logger = require('./common/logger');
const routes = require('./routes');

const delayResponse = require('./middlewares/delayResponse');

const server = restify.createServer();
const corsSetup = restifyCorsMiddleware({});

restifyPromise.install(server);

server.use(restifyLogger('tiny'));
server.use(corsSetup.actual);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({ mapParams: true }));

server.pre([
	serveStaticRestify('dist'),
	serveStaticRestify('public'),
]);
server.pre(corsSetup.preflight);
server.pre(delayResponse());

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
