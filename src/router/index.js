import Vue from 'vue'
import Router from 'vue-router'
import IndexZh from '@/components/index_zh'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index_zh',
      component: IndexZh
    }
  ]
})
