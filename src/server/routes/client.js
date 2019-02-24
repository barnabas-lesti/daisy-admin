const appRootPath = require('app-root-path').path;
const fsExtra = require('fs-extra');
const path = require('path');

const client = server => {
	server.get('*', async (req, res) => {
		const indexHtmlContent = await fsExtra.readFile(path.join(appRootPath, 'dist/index.html'), 'utf-8');
		res.writeHead(200, {
			'Content-Length': Buffer.byteLength(indexHtmlContent),
			'Content-Type': 'text/html',
		});
		res.write(indexHtmlContent);
		res.end();
	});
};

module.exports = client;
