export default [
	{
		component: () => import('../components/food/FoodViewList'),
		name: 'food',
		path: '/food',
	},
	{
		component: () => import('../components/food/FoodViewSingle'),
		name: 'foodNew',
		path: '/food/new',
	},
	{
		component: () => import('../components/food/FoodViewSingle'),
		name: 'foodEdit',
		path: '/food/:_id',
	},
];
