import Vue from 'vue';

import router from './router';
import i18n from './i18n';
import config from './common/config';
import logger from './common/logger';

import App from './components/App';

import './styles/main.less';

logger.info(`Node environment: "${config.NODE_ENV}".`);
Vue.config.productionTip = !config.IS_PRODUCTION;

new Vue({
	render: h => h(App),
	router,
	i18n,
}).$mount('#app');
