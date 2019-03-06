export default [
	{
		component: () => import('../components/home/HomeView'),
		name: 'home',
		path: '/',
	},
	{
		path: '**',
		redirect: {
			name: 'home',
		},
	},
];
