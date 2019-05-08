import Vue from 'vue';
import VueI18n from 'vue-i18n';

import config from '../common/config';
import logger from '../common/logger';
import storageService, { StorageKeys } from '../services/storageService';

import enUS from './messages/en-US';

Vue.use(VueI18n);

const url = new URL(window.location.href);
const forcedLocale = url.searchParams.get('locale');
if (forcedLocale) {
	storageService.saveToLocalStorage(StorageKeys.common.LOCALE, forcedLocale);
}
const locale = forcedLocale || storageService.fetchFromLocalStorage(StorageKeys.common.LOCALE) || window.navigator.language || config.DEFAULT_LOCALE;
logger.info(`Using locale: "${locale}".`);

export default new VueI18n({
	locale,
	messages: {
		'en-US': enUS,
	},
});
