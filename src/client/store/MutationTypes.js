const MutationTypes = {
	dashboardView: {
		INCREMENT: 'dv.INCREMENT',
	},

	foodView: {
		SET_SEARCH_STRING: 'fv.SET_SEARCH_STRING',
		SHOW_MODAL: 'fv.SHOW_MODAL',
		HIDE_MODAL: 'fv.HIDE_MODAL',
		SET_FOOD: 'fv.SET_FOOD',
		ADD_FOOD: 'fv.ADD_FOOD',
		REMOVE_FOOD: 'fv.REMOVE_FOOD',
		UPDATE_ITEM_IN_FOOD: 'fv.UPDATE_ITEM_IN_FOOD',
	},

	calculatorView: {
		SET_CALCULATOR_MODEL: 'cv.SET_CALCULATOR_MODEL',
	},
};

export default MutationTypes;
