import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
	base: process.env.BASE_URL,
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
