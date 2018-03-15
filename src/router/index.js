import Vue from 'vue'
import Router from 'vue-router'
import IndexZh from '@/components/index_zh'
/*
import Index from '@/components/index'
import IdCardCheck from '@/components/idCardCheck'
import UserCardInfo from '@/components/userCardInfo'
import DictionarySelect from '@/components/dictionarySelect'
import IdentitySupplement from '@/components/identitySupplement'
import ProvinceCitySelect from '@/components/provinceCitySelect'
import CountySelect from '@/components/countySelect' */

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 首页
    {
      path: '/',
      name: 'index_zh',
      component: IndexZh
    },
    // 测试跳转页面
    {
      path: '/download',
      name: 'download',
      // 使用懒加载的方式配置其他页面，提高首页加载速度
      component: resolve => require(['@/components/download.vue'], resolve)
    },
    // 业务页面1
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/components/index.vue'], resolve)
    },
    // 业务页面2
    {
      path: '/idCardCheck',
      name: 'idCardCheck',
      component: resolve => require(['@/components/idCardCheck.vue'], resolve)
    },
    // 业务页面3
    {
      path: '/userCardInfo',
      name: 'userCardInfo',
      component: resolve => require(['@/components/userCardInfo.vue'], resolve)
    },
    // 业务页面3-1
    {
      path: '/dictionarySelect',
      name: 'dictionarySelect',
      component: resolve => require(['@/components/dictionarySelect.vue'], resolve)
    },
    // 业务页面4
    {
      path: '/identitySupplement',
      name: 'identitySupplement',
      component: resolve => require(['@/components/identitySupplement.vue'], resolve)
    },
    // 业务页面4-1
    {
      path: '/provinceCitySelect',
      name: 'provinceCitySelect',
      component: resolve => require(['@/components/provinceCitySelect.vue'], resolve)
    },
    // 业务页面4-1-1
    {
      path: '/countySelect',
      name: 'countySelect',
      component: resolve => require(['@/components/countySelect.vue'], resolve)
    }
  ]
})
