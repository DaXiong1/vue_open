import Vue from 'vue'
import Router from 'vue-router'
import IndexZh from '@/components/index_zh'
import Download from '@/components/download'
import Index from '@/components/index'

Vue.use(Router)

export default new Router({
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
      component: Download
    },
    // 业务页面1
    {
      path: '/index',
      name: 'index',
      component: Index
    }
  ]
})
