import { reqSeckList } from '../../utils/request'
const state = {
    list: []
};
const mutations = {
    changeList(state, arr) {
        state.list = arr;
    }
};
const actions = {
    reqListAction(context) {
        reqSeckList().then(res => {
            if (res.data.code === 200) {
                
                context.commit("changeList", res.data.list);
            }
        });
    }
};
const getters = {
    list(state) {
        return state.list;
    }
};
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}