export const state = () => ({
	user: {},
});

export const mutations = {
	login (state) {
		state.user = {
			imageUrl: 'https://randomuser.me/api/portraits/men/85.jpg',
			fullName: 'Jon Snow',
			isLoggedIn: true,
		};
	},
	logout (state) {
		state.user = {};
	},
};
