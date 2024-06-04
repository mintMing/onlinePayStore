import Vue from "vue";
import Vuex from "vuex";
import system from "@/store/modules/system.js";
import getters from "./getter.js";
import cars from "@/store/modules/cars.js";
import merchant from "@/store/modules/merchant.js"
import goods from "./modules/goods.js";

Vue.use(Vuex);

const store = new Vuex.Store({
	getters,
	modules: {
		system,
		cars,
		merchant,
		goods,
	}
})

export default store;