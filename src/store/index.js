import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)

import { actions } from './actions'
import { state, mutations, getters } from './mutations'
import cate from './modules/cate'
import spec from './modules/spec'
import goods from './modules/goods'
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:
    {
        cate,
        spec,
        goods
    }
})
export default store;