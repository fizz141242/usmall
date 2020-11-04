import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)

import { actions } from './actions'
import { state, mutations, getters } from './mutations'
import cate from './modules/cate'
import spec from './modules/spec'
import goods from './modules/goods'
import banner from './modules/banner'
import seck from './modules/seck'
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:
    {
        cate,
        spec,
        goods,
        banner,
        seck
    }
})
export default store;