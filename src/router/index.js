import Vue from 'vue'
import Router from 'vue-router'
import IndexZh from '@/components/index_zh'
import Download from '@/components/download'
import Index from '@/components/index'
import IdCardCheck from '@/components/idCardCheck'
import UserCardInfo from '@/components/userCardInfo'
import DictionarySelect from '@/components/dictionarySelect'
import IdentitySupplement from '@/components/identitySupplement'
import ProvinceCitySelect from '@/components/provinceCitySelect'
import CountySelect from '@/components/countySelect'

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
    },
    // 业务页面2
    {
      path: '/idCardCheck',
      name: 'idCardCheck',
      component: IdCardCheck
    },
    // 业务页面3
    {
      path: '/userCardInfo',
      name: 'userCardInfo',
      component: UserCardInfo
    },
    // 业务页面3-1
    {
      path: '/dictionarySelect',
      name: 'dictionarySelect',
      component: DictionarySelect
    },
    // 业务页面4
    {
      path: '/identitySupplement',
      name: 'identitySupplement',
      component: IdentitySupplement
    },
    // 业务页面4-1
    {
      path: '/provinceCitySelect',
      name: 'provinceCitySelect',
      component: ProvinceCitySelect
    },
    // 业务页面4-1-1
    {
      path: '/countySelect',
      name: 'countySelect',
      component: CountySelect
    }
  ]
})
