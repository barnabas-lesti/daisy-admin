import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';
import initialState from './initialState';

export { default as ActionTypes } from './ActionTypes';
export { default as MutationTypes } from './MutationTypes';

Vue.use(Vuex);

export default new Vuex.Store({
	state: initialState,
	actions,
	mutations,
});
