import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from './views/Dashboard.vue';

Vue.use(Router);

export default new Router({
	base: process.env.BASE_URL,
	mode: 'history',
	routes: [
		{
			component: () => Dashboard,
			name: 'dashboard',
			path: '/',
		},
	],
});
