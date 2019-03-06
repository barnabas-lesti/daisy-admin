export default [
	{
		component: () => import('../components/food/FoodListView'),
		name: 'food',
		path: '/food',
	},
	{
		component: () => import('../components/food/FoodSingleView'),
		name: 'foodNew',
		path: '/food/new',
	},
	{
		component: () => import('../components/food/FoodSingleView'),
		name: 'foodEdit',
		path: '/food/:_id',
	},
];
