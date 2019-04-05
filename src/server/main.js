const appRootPath = require('app-root-path').path;
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const config = require('./common/config');
const database = require('./common/database');
const logger = require('./common/logger');

const apiResponder = require('./middlewares/apiResponder');
const clientEntryResolver = require('./middlewares/clientEntryResolver');
const delayResponse = require('./middlewares/delayResponse');

const controllers = require('./controllers');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use([
	express.static(path.join(appRootPath, 'dist')),
	express.static(path.join(appRootPath, 'public')),
]);
app.use(morgan('common'));
app.use(delayResponse());

for (const controller of controllers) {
	app.use('/api', controller(express.Router()));
}
app.use('/api', apiResponder());

app.use('*', clientEntryResolver());

database.connect();

const server = app.listen(config.PORT, () => {
	const { address, port } = server.address();
	logger.info(`Server started: ${ address + port }`);
	return server;
});
