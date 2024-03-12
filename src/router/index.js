import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'
import {MedInfo} from '@/api/data.js'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/page/Login/Login.vue'),
      meta: {
        title: '登录',
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/page/Login/register.vue'),
      meta: {
        title: '报名表',
      }
    },
    {
      path: '/fellow-villager',
      name: 'FellowVillager',
      component: () => import('@/page/Login/FellowVillager.vue'),
      meta: {
        title: '威县新乡贤',
      }
    },
    {
      path: '/',
      name: 'Index',
      component:  () => import('@/page/Index/IndexIcon.vue'),
      meta: {
        title: '首页',
        requireAuth: true,
        type:'tool'
      }
    },
    {
      path: '/Index',
      name: 'IndexTool',
      component:  () => import('@/page/Index/IndexIcon.vue'),
      meta: {
        title: '首页',
        requireAuth: true,
        type:'tool'
      }
    },{
      path: '/IndexIcon',
      name: 'IndexIcon',
      component:  () => import('@/page/Index/IndexIcon.vue'),
      meta: {
        title: '首页',
        requireAuth: true,
        type:'tool'
      }
    },
    {
      path: '/aiuser',
      name: 'AiUser',
      component:  () => import('@/page/AiUser/AiUser.vue'),
      meta: {
        title: '首页',
        requireAuth: true,
        type:'tool'
      }
    },
    {
      path: '/aivoiceperson',
      name: 'AiVoicePersion',
      component:  () => import('@/page/AiUser/AiVoicePersion.vue'),
      meta: {
        title: '首页',
        requireAuth: true,
        type:'tool'
      }
    },
    {
      path: '/aiStatistics',
      name: 'AiStatistics',
      component:  () => import('@/page/AiStatistics/AiStatistics.vue'),
      meta: {
        title: '首页',
        requireAuth: true,
        type:'tool'
      }
    },{
      path: '/users',
      name: 'Users',
      component:  () => import('@/page/User/Index.vue'),
      meta: {
        title: '用户查询',
        requireAuth: true,
        type:'tool'
      }
    },
    {
      path: '/user/card',
      name: 'UserCard',
      component:  () => import('@/page/user/Card.vue'),
      meta: {
        title: '会员卡管理',
        requireAuth: true,
        type:'tool'
      }
    },
    {
      path: '/user/card-record',
      name: 'UserCardRecord',
      component:  () => import('@/page/user/CardRecord.vue'),
      meta: {
        title: '购卡查询',
        requireAuth: true,
        type:'tool'
      }
    },

    {
      path: '/index-med',
      name: 'IndexMed',
      component:  () => import('@/page/Index/IndexMed.vue'),
      meta: {
        title: MedInfo.projectName,
        requireAuth: true,
        type:'med'
      }
    },
    {
      path: '/medicine-info',
      name: 'MedicineInfo',
      component:  () => import('@/page/Product/MedicineInfo.vue'),
      meta: {
        title: MedInfo.projectName,
        requireAuth: true,
        type:'med'
      }
    },
  ]
})

router.beforeEach(function (to, from, next) {
  
  if (to.path === '/login' || to.path === '/register'|| to.path ===  '/fellow-villager') {
    next();
  } else {
    let token = store.state.userModule.token;
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      document.title = to.meta.title;
      next();
    }
  }

});

export default router