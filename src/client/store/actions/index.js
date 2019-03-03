import ActionTypes from '../ActionTypes';
import MutationTypes from '../MutationTypes';

export default {
	[ActionTypes.dashboardView.INCREMENT_ASYNC]: store => {
		return new Promise(resolve => {
			window.setTimeout(() => {
				store.commit(MutationTypes.dashboardView.INCREMENT);
				resolve();
			}, 1000);
		});
	},
};
