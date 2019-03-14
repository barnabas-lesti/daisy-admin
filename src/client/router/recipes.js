export default [
	{
		component: () => import('../components/recipes/RecipesViewList'),
		name: 'recipes',
		path: '/recipes',
	},
	{
		component: () => import('../components/recipes/RecipesViewSingle'),
		name: 'recipeNew',
		path: '/recipes/new',
	},
	{
		component: () => import('../components/recipes/RecipesViewSingle'),
		name: 'recipeEdit',
		path: '/recipes/:_id',
	},
];
