import Vue from 'vue';

import App from './App.vue';
// import Sidebar from './partials/Sidebar.vue';
// import router from './router';

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	// router,
}).$mount('#app');
