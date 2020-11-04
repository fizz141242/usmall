import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
Vue.use(Router)

function checkedRoute(path,next){
  let userInfo =store.state.userInfo;
  if(userInfo.menus_url.includes(path)){
    next()
  }else{
    next("/")
  }
}



export const indexRoutes = [
  {
    path: 'menu',
    component: () => import('../pages/menu/menu'),
    name: '菜单管理',
    beforeEnter: (to, from, next) => {
      checkedRoute('/menu',next)
    }
  },

  {
    path: 'role',
    component: () => import('../pages/role/role'),
    name: '角色管理',
    beforeEnter: (to, from, next) => {
      checkedRoute('/role',next)
    }
  },
  {
    path: 'manage',
    component: () => import('../pages/manage/manage'),
    name: '管理员管理',
    beforeEnter: (to, from, next) => {
      checkedRoute('/manage',next)
    }
  },
  {
    path: 'cate',
    component: () => import('../pages/cate/cate'),
    name: '商品分类',
    beforeEnter: (to, from, next) => {
      checkedRoute('/cate',next)
    }
  },
  {
    path: 'spec',
    component: () => import('../pages/spec/spec'),
    name: '商品规格',
    beforeEnter: (to, from, next) => {
      checkedRoute('/spec',next)
    }
  },
  {
    path: 'goods',
    component: () => import('../pages/goods/goods'),
    name: '商品管理',
    beforeEnter: (to, from, next) => {
      checkedRoute('/goods',next)
    }
  },
  {
    path: 'member',
    component: () => import('../pages/member/member'),
    name: '会员管理',
    beforeEnter: (to, from, next) => {
      checkedRoute('/member',next)
    }
  },
  {
    path: 'banner',
    component: () => import('../pages/bannner/banner'),
    name: '轮播图管理',
    beforeEnter: (to, from, next) => {
      checkedRoute('/banner',next)
    }
  },
  {
    path: 'seckill',
    component: () => import('../pages/seckill/seckill'),
    name: '秒杀活动',
    beforeEnter: (to, from, next) => {
      checkedRoute('/seckill',next)
    }
  }
]

let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../pages/login/login')
    },
    {
      path: '/',
      component: () => import('../pages/index/index.vue'),
      children: [
        {
          path: '',
          component: () => import('../pages/home/home'),
        },
        
      ].concat(indexRoutes)

    }
  ]
})
// 登录拦截
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
    return
  }
  let userInfo = store.state.userInfo;
  if (userInfo.username) {
    next()
    return
  }
  next('/login')
})
export default router