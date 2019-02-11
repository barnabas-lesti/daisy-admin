import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const routes = {
	DASHBOARD: {
		component: () => import('./views/Dashboard.vue'),
		icon: 'dashboard',
		label: 'Dashboard',
		name: 'dashboard',
		path: '/dashboard',
	},
	HOME: {
		icon: 'home',
		label: 'Home',
		name: 'home',
		path: '/',
		redirect: {
			name: 'dashboard',
		},
	},
};

export const router = new Router({
	base: process.env.BASE_URL,
	mode: 'history',
	routes: [
		...Object.values(routes),
		{
			path: '**',
			redirect: {
				name: 'home',
			},
		},
	],
});
