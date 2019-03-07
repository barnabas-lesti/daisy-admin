import Vue from 'vue';

import router from './router';
import App from './components/App';
import config from './common/config';
import logger from './common/logger';

import './styles/main.less';

if (config.NODE_ENV !== 'production') {
	logger.info(`Node environment: "${config.NODE_ENV}".`);
}

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	router,
}).$mount('#app');
