import Vue from 'vue';

import router from './router';
import i18n from './i18n';
import config from './common/config';
import logger from './common/logger';
import httpService from './services/httpService';
import storageService, { StorageKeys } from './services/storageService';

import App from './components/App';

import './styles/main.less';

const getLocale = () => {
	const url = new URL(window.location.href);
	const forcedLocale = url.searchParams.get('locale');
	if (forcedLocale) {
		storageService.saveToLocalStorage(StorageKeys.common.LOCALE, forcedLocale);
	}
	const locale = forcedLocale || storageService.fetchFromLocalStorage(StorageKeys.common.LOCALE) || window.navigator.language || config.DEFAULT_LOCALE;
	logger.info(`Using locale: "${locale}".`);
	return locale;
};

logger.info(`Node environment: "${config.NODE_ENV}".`);
Vue.config.productionTip = !config.IS_PRODUCTION;

const locale = getLocale();

httpService
	.get(`/i18n/${locale}`)
	.then(messages => {
		document.getElementsByClassName('_critical')[0].style.display = 'none';
		new Vue({
			render: h => h(App),
			router,
			i18n: i18n(locale, messages),
		}).$mount('#app');
	});
