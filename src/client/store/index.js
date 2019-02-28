import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		count: 0,

		foodView: {
			food: undefined,
			searchString: undefined,
			modalSubject: undefined,
			loadFood: undefined,
		},
	},
	actions,
	mutations,
});

export default store;
