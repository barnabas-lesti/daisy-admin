import Vue from 'vue';
import VueRouter from 'vue-router';

import config from './config';

Vue.use(VueRouter);

const router = new VueRouter({
	base: config.BASE_URL,
	mode: 'history',
	routes: [
		{
			component: () => import('../components/dashboard/DashboardView'),
			name: 'dashboard',
			path: '/dashboard',
		},
		{
			component: () => import('../components/food/FoodView'),
			name: 'food',
			path: '/food',
		},
		{
			component: () => import('../components/calculator/CalculatorView'),
			name: 'calculator',
			path: '/calculator',
		},

		{
			component: () => import('../components/profile/ProfileRegistrationView'),
			name: 'registration',
			path: '/register',
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

export default router;
