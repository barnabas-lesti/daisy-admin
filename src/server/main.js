const restify = require('restify');

const config = require('./common/config');
const logger = require('./common/logger');
const routes = require('./routes');

var server = restify.createServer();

for (const route of routes) {
	route(server);
}

server.listen(config.common.PORT, () => {
	logger.info(`API Server started: ${ server.url }`);
});
