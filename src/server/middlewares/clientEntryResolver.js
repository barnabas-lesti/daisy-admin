const appRootPath = require('app-root-path').path;
const fsExtra = require('fs-extra');
const path = require('path');

module.exports = () => async (req, res) => {
	const indexHtmlContent = await fsExtra.readFile(path.join(appRootPath, 'dist/index.html'), 'utf-8');
	res.type('html');
	res.send(indexHtmlContent);
	return;
};
