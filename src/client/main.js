import Vue from 'vue';

import App from './components/App';
import router from './common/router';
import env from './common/env';

import './styles/settings.less';

if (env.NODE_ENV !== 'production') {
	console.log(`[Daisy] Node environment: "${env.NODE_ENV}".`);
}

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	router,
}).$mount('#app');
