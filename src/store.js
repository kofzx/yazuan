import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		cartNums: 0
	},
	mutations: {
		incrementCartNums: state => state.cartNums++
	}
});

export default store;