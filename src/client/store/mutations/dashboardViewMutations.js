import MutationTypes from '../MutationTypes';

const DashboardViewMutations = MutationTypes.dashboardView;

export default {
	[DashboardViewMutations.SET_SEARCH_STRING]: (state, value) => state.foodView.searchString = value,
};
