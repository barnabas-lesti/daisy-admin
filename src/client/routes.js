import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const router = new Router({
	base: process.env.BASE_URL,
	mode: 'history',
	routes: [
		{
			component: () => import('./components/dashboard/DashboardView'),
			name: 'dashboard',
			path: '/dashboard',
		},
		{
			component: () => import('./components/food/FoodView'),
			name: 'food',
			path: '/food',
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
