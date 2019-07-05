export const state = () => ({
	notification: undefined,
});

export const mutations = {
	showInfo (state, text) {
		state.notification = { type: 'info', text };
	},
	showError (state, text) {
		state.notification = { type: 'error', text };
	},
	showSuccess (state, text) {
		state.notification = { type: 'success', text };
	},
	clear (state) {
		state.notification = undefined;
	},
};
