import Vue from 'vue';

import App from './App.vue';
import { router } from './routes';

import './styles/settings.less';

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	router,
}).$mount('#app');
