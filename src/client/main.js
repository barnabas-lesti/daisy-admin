import Vue from 'vue';

import App from './components/App';
import router from './common/router';
import config from './common/config';

import './styles/settings.less';

if (config.NODE_ENV !== 'production') {
	console.log(`[Daisy] Node environment: "${config.NODE_ENV}".`);
}

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	router,
}).$mount('#app');
