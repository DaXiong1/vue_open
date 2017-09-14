import Vue from 'vue'
import Vueresource from 'vue-resource'
import * as config from '../config/config'

Vue.use(Vueresource)
Vue.http.options.emulateJSON = true  // 启用该选项后，请求会以application/x-www-form-urlencoded作为MIME type，就像普通的HTML表单一样。

// ajax请求
function request (param) {
  Vue.http.post(config.serverPath, param).then(
    (res) => {
      // 响应成功回调
      console.log('Request failed' + res)
    }, (res) => {
    // 响应错误回调
    console.log('Request failed' + res)
  })
}

// sessionStorage set 方法
function setSStorageInfo (key, value) {
  try {
    if (key !== '') {
      sessionStorage.setItem(key, value)
    } else {
      alert('key值不能为空')
    }
  } catch (e) {
    alert('您的浏览器不支持sessionStorage')
  }
}

// sessionStorage get 方法
function getSStorageInfo (key) {
  var result = null
  try {
    if (key !== '') {
      result = sessionStorage.getItem(key)
    } else {
      alert('key值不能为空')
    }
  } catch (e) {
    alert('您的浏览器不支持sessionStorage')
  }
  return result
}

export {
  request,
  setSStorageInfo,
  getSStorageInfo
}
