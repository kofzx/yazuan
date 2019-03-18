import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const INCREMENT_CART_NUMS = 'INCREMENT_CART_NUMS';

const store = new Vuex.Store({
	state: {
		cartNums: 0
	},
	actions: {
		addCart({ commit }) {
			commit(INCREMENT_CART_NUMS);
		}
	},
	mutations: {
		[INCREMENT_CART_NUMS]: state => state.cartNums++
	}
});

export default store;