import { reqSpecCount, reqSpecList } from '../../utils/request'
let state = {
    list: [],
    // 总数
    total:0,
    size:2,
    page:1
}
let mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changeTotal(state,num){
        state.total=num
    },
    changePage(state,page){
        state.page=page
    },
}
let actions = {
    reqListAction(context,bool) {
        let p =bool?{}:{page:context.state.page,size:context.state.size}
        reqSpecList(p).then(res=>{})
        reqSpecList({ page:context.state.page, size: context.state.size }).then((res) => {
            if (res.data.code === 200) {
                let list = res.data.list ? res.data.list : []
               if(list.length==0&&context.state.page>1){
                   context.commit('changePage',context.state.page-1)
                   context.dispatch('reqListAction')
                   return
               }
               list.forEach(item=> {
                   item.attrs=JSON.parse(item.attrs)
               });
               context.commit('changeList',list)
            }
        })
    },
    reqTotalAction(context){
        reqSpecCount().then(res=>{
            if(res.data.code===200){
                context.commit('changeTotal',res.data.list[0].total)
            }
        })
    },
    changePageAction(context,page){
        context.commit('changePage',page),
        //重新请求list
        context.dispatch('reqListAction')
    }
}
let getters = {
    list(state) {
        return state.list
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}