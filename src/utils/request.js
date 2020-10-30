import axios from 'axios'
import qs from 'qs'
import { errorAlert } from './alert'
import Vue from 'vue'
// 响应拦截
axios.interceptors.response.use(res => {
    console.log('本次请求的地址是：' + res.config.url)
    console.log(res)
    if (res.data.code != 200) {
        errorAlert(res.data.msg)
    }
    return res
})
// --------------------------------------------------------------
// 菜单添加
let baseUrl = '/api'
Vue.prototype.$imgPre = 'http://localhost:3000'
export const reqMenuAdd = (form) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(form)
    })
}
// 菜单详情 one
export const reqMenuDetail = (id) => {

    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
// 菜单修改
export const reqMenuUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(form)
    })
}
// 菜单删除
export const reqMenuDel = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}
// 菜单列表
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}
// --------------------------------------------------------------
// 角色添加
export const reqRoleAdd = (form) => {
    return axios({
        url: baseUrl + '/api/roleadd',
        method: "post",
        data: qs.stringify(form)
    })
}
//角色列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + '/api/rolelist',
        method: "get"
    })
}
// 角色获取 一条
export const reqRoleDetail = (id) => {
    return axios({
        url: baseUrl + '/api/roleinfo',
        method: "get",
        params: {
            id: id
        }
    })
}
// 角色修改
export const reqRoleUpdate = (form) => {
    return axios({
        url: baseUrl + '/api/roleedit',
        method: "post",
        data: qs.stringify(form)
    })
}
// 角色删除
export const reqRoleDel = (id) => {
    return axios({
        url: baseUrl + '/api/roledelete',
        method: "post",
        data: qs.stringify({ id: id })
    })
}
// --------------------------------------------------------------
// 管理员添加
export const reqManageAdd = (form) => {
    return axios({
        url: baseUrl + '/api/useradd',
        method: "post",
        data: qs.stringify(form)
    })
}
// 管理员总数   用于计算分页
export const reqManageCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get",
    })
}
// 管理员列表 分页
export const reqManageList = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: params
    })
}
// 管理员获取 一条
export const reqManageDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}
// 管理员修改
export const reqManageUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(form)
    })
}
// 管理员删除
export const reqManageDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({
            uid: uid
        })

    })
}
// 管理员登录
// export const reqManageList=(params)=>{
//     return axios({
//         url:baseUrl+"/api/userlist",
//         method:"get",
//         params:params
//     })
// }
// --------------------------------------------------------------
// 商品分类添加
export const reqCateAdd = (data) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: data

    })
}

// 商品分类列表
export const reqCateList = (params) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params:params
    })
}
// 商品分类获取 一条
export const reqCateDetail = (id) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
// 商品分类修改
export const reqCateUpdate = (data) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: data
    })
}
// 商品分类删除
export const reqCateDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}
// --------------------------------------
//商品规格添加
export const reqSpecAdd = (form) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(form)
    })
}
//商品规格总数 用于计算分页
export const reqSpecCount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",

    })
}
// 商品规格列表 分页
export const reqSpecList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: params
    })
}
// 商品规格获取 详情 一条
export const reqSpecDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: uid
        }
    })
}

// 商品规格修改
export const reqSpecUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(form)
    })
}
// 商品规格删除
export const reqSpecDel = (uid) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({
            id: uid
        })
    })
}
// ---------------------------------------------------
//商品管理添加
export const reqGoodsAdd = (form) => {
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: form
    })
}
//商品管理总数 用于计算分页
export const reqGoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",

    })
}
// 商品管理列表 分页
export const reqGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: params
    })
}
// 商品管理获取 详情 一条
export const reqGoodsDetail = (id) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 商品管理修改
export const reqGoodsUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data:form
    })
}
// 商品管理删除
export const reqGoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

