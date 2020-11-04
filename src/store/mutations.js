export const mutations = {
    changeUserInfo(state,info){
        state.userInfo=info;
        if(info.username){
            sessionStorage.setItem('userInfo',JSON.stringify(info))
        }else{
            sessionStorage.removeItem('userInfo')
        }
    }
}
export const state = {
    userInfo:sessionStorage.getItem('userInfo')?
    JSON.parse(sessionStorage.getItem('userInfo')):{}
}
export const getters = {
    userInfo(state){
        return state.userInfo;
    }
}