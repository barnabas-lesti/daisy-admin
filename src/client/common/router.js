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
			component: () => import('../components/recipes/RecipesListView'),
			name: 'recipes',
			path: '/recipes',
		},
		{
			component: () => import('../components/recipes/RecipesSingleView'),
			name: 'recipeNew',
			path: '/recipes/new',
		},
		{
			component: () => import('../components/recipes/RecipesSingleView'),
			name: 'recipeEdit',
			path: '/recipes/:_id',
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
