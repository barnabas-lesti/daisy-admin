export default [
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
];
