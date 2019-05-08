const appRootPath = require('app-root-path').path;
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const database = require('./database');

const config = require('./common/config');
const logger = require('./common/logger');
const routes = require('./routes');

const auth = require('./middlewares/auth');
const clientEntryResolver = require('./middlewares/clientEntryResolver');
const delayResponse = require('./middlewares/delayResponse');
const responder = require('./middlewares/responder');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(auth());

app.use([
	express.static(path.join(appRootPath, 'dist')),
	express.static(path.join(appRootPath, 'public')),
]);
app.use(morgan('common'));
app.use(delayResponse());

for (const route of routes) {
	app.use('/api', route(express.Router()));
}
app.use('/api', responder());

app.use('*', clientEntryResolver());

database.connect();

const server = app.listen(config.PORT, () => {
	const { address, port } = server.address();
	logger.info(`Server started: ${ address + port }`);
	return server;
});
