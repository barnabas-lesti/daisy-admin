export default [
	{
		component: () => import('../components/home/HomeView'),
		name: 'home',
		path: '/',
		exact: true,
	},
	{
		path: '**',
		redirect: {
			name: 'home',
		},
	},
];
