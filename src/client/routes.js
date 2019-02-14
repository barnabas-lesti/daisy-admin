import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const router = new Router({
	base: process.env.BASE_URL,
	mode: 'history',
	routes: [
		{
			component: () => import('./components/views/Dashboard.vue'),
			name: 'dashboard',
			path: '/dashboard',
		},
		{
			component: () => import('./components/views/Foods.vue'),
			name: 'foods',
			path: '/foods',
		},

		{
			name: 'home',
			path: '/',
			redirect: {
				name: 'dashboard',
			},
		},
		{
			path: '**',
			redirect: {
				name: 'home',
			},
		},
	],
});
