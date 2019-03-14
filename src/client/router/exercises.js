export default [
	{
		component: () => import('../components/exercises/ExercisesViewList'),
		name: 'exercises',
		path: '/exercises',
	},
	{
		component: () => import('../components/exercises/ExercisesViewSingle'),
		name: 'exerciseNew',
		path: '/exercises/new',
	},
	{
		component: () => import('../components/exercises/ExercisesViewSingle'),
		name: 'exerciseEdit',
		path: '/exercises/:_id',
	},
];
