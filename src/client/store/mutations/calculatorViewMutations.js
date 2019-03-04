import MutationTypes from '../MutationTypes';

const FoodViewMutations = MutationTypes.foodView;

export default {
	[FoodViewMutations.SET_SEARCH_STRING]: (state, value) => state.foodView.searchString = value,
	[FoodViewMutations.SHOW_MODAL]: (state, value) => state.foodView.modalSubject = value,
	[FoodViewMutations.HIDE_MODAL]: state => state.foodView.modalSubject = undefined,
	[FoodViewMutations.ADD_FOOD]: (state, food) => state.foodView.food.push(food),
	[FoodViewMutations.SET_FOOD]: (state, food) => state.foodView.food = food,
	[FoodViewMutations.REMOVE_FOOD]: (state, id) => state.foodView.food = state.foodView.food.filter(item => item._id !== id),
	[FoodViewMutations.UPDATE_ITEM_IN_FOOD]: (state, update) => state.foodView.food = state.foodView.food.map(item => item._id === update._id ? update : item),
};
