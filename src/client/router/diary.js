export default [
	{
		component: () => import('../components/diary/DiaryDayView'),
		name: 'diaryDay',
		path: '/diary/:year/:month/:day',
	},
];
