import Vue from 'vue';

import router from './router';
import i18n from './i18n';
import App from './components/App';
import config from './common/config';
import logger from './common/logger';
import httpService from './services/httpService';

import './styles/main.less';

if (config.NODE_ENV !== 'production') {
	logger.info(`Node environment: "${config.NODE_ENV}".`);
}

Vue.config.productionTip = false;

httpService
	.get('/i18n', { locales: ['en'] })
	.then(messages => {
		new Vue({
			render: h => h(App),
			router,
			i18n: i18n(messages),
		}).$mount('#app');
	});
