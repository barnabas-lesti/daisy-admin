import MutationTypes from './MutationTypes';

const mutations = {
	[MutationTypes.dashboardView.INCREMENT]: state => state.count++,

	// FoodView
	[MutationTypes.foodView.SET_SEARCH_STRING] (state, value) {
		state.foodView.searchString = value;
	},
	[MutationTypes.foodView.SHOW_MODAL] (state, value) {
		state.foodView.modalSubject = value;
	},
	[MutationTypes.foodView.HIDE_MODAL] (state) {
		state.foodView.modalSubject = undefined;
	},
	[MutationTypes.foodView.ADD_FOOD] (state, food) {
		state.foodView.food.push(food);
	},
	[MutationTypes.foodView.SET_FOOD] (state, food) {
		state.foodView.food = food;
	},
	[MutationTypes.foodView.REMOVE_FOOD] (state, id) {
		state.foodView.food = state.foodView.food.filter(item => item._id !== id);
	},
	[MutationTypes.foodView.UPDATE_ITEM_IN_FOOD] (state, update) {
		const updatedFoodList = state.foodView.food.map(item => item._id === update._id ? update : item);
		state.foodView.food = updatedFoodList;
	},
};

export default mutations;
