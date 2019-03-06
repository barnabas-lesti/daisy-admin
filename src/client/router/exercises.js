export default [
	{
		component: () => import('../components/exercises/ExercisesListView'),
		name: 'exercises',
		path: '/exercises',
	},
	{
		component: () => import('../components/exercises/ExercisesSingleView'),
		name: 'exerciseNew',
		path: '/exercises/new',
	},
	{
		component: () => import('../components/exercises/ExercisesSingleView'),
		name: 'exerciseEdit',
		path: '/exercises/:_id',
	},
];
