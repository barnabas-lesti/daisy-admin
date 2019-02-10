import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
	base: process.env.BASE_URL,
	mode: 'history',
	routes: [
		{
			component: Home,
			name: 'home',
			path: '/',
		},
		{
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			path: '/about',
		},
	],
});
