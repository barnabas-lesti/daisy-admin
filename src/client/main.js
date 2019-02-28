import Vue from 'vue';

import App from './components/App';
import router from './common/router';
import config from './common/config';
import logger from './common/logger';

import './styles/settings.less';

if (config.NODE_ENV !== 'production') {
	logger.info(`Node environment: "${config.NODE_ENV}".`);
}

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	router,
}).$mount('#app');
