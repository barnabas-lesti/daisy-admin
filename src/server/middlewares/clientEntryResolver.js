const appRootPath = require('app-root-path').path;
const fsExtra = require('fs-extra');
const path = require('path');

module.exports = () => (req, res) => {
	const indexHtmlContent = fsExtra.readFileSync(path.join(appRootPath, 'dist/index.html'), 'utf-8');
	res.type('html');
	res.send(indexHtmlContent);
	return;
};
