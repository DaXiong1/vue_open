// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as Utils from './utils/util'
import * as $ from './utils/base'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

var phoneno = ''
phoneno = Utils.getUrlParam('phoneno')
console.log('phoneno=' + phoneno)
if (!!phoneno && true) { // 这么写为了使eslint校验通过
  $.setSStorageInfo('phoneno', phoneno)
}

