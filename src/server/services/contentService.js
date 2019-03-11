const fsExtra = require('fs-extra');
const jsYaml = require('js-yaml');
const path = require('path');

const config = require('../common/config');

const { BUCKET_PATH, DEFAULT_LOCALE } = config;
const I18N_MESSAGES_PATH = path.join(BUCKET_PATH, 'i18n');

class ContentService {
	async getMessagesByLocale (locale) {
		const messages = await this._readFile(path.join(I18N_MESSAGES_PATH, `${ locale }.yml`), { extension: 'yml' });
		if (messages !== null) {
			return {
				[locale]: messages,
			};
		} else {
			return {
				[DEFAULT_LOCALE]: await this._readFile(path.join(I18N_MESSAGES_PATH, `${ DEFAULT_LOCALE }.yml`), { extension: 'yml' }),
			};
		}
	}

	async _readFile (path = '', options = {}) {
		const {
			isRelativePath = false,
			extension = '',
		} = options;

		try {
			const rawContent = await fsExtra.readFile(isRelativePath ? path.join(BUCKET_PATH, path) : path, 'utf-8');

			switch (extension) {
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
}

module.exports = new ContentService();
