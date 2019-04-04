const appRootPath = require('app-root-path').path;
const fsExtra = require('fs-extra');
const jsYaml = require('js-yaml');
const path = require('path');

const config = require('../common/config');

const { DEFAULT_LOCALE } = config;

class ContentService {
	async getMessagesByLocale (locale) {
		const messages = await this._readFileFromAppRoot(path.join(`/static/i18n/${ locale }.yml`));
		if (messages !== null) {
			return {
				[locale]: messages,
			};
		} else {
			return {
				[DEFAULT_LOCALE]: await this._readFileFromAppRoot(path.join(`/static/i18n/${ DEFAULT_LOCALE }.yml`)),
			};
		}
	}

	async _readFileFromAppRoot (filePath = '') {
		try {
			const rawContent = await fsExtra.readFile(path.join(appRootPath, filePath), 'utf-8');

			switch (this._getFileExtensionFromFilePath(filePath)) {
			case 'yml':
			case 'yaml':
				return jsYaml.safeLoad(rawContent);
			default:
				return rawContent;
			}
		} catch (error) {
			if (error.code === 'ENOENT') {
				return null;
			}
			throw error;
		}
	}

	_getFileExtensionFromFilePath (filePath) {
		const fragments = filePath.split('.');
		return fragments[fragments.length - 1];
	}
}

module.exports = new ContentService();
