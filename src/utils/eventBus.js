import Vue from 'vue'
import Vueresource from 'vue-resource'
import * as config from '../config/config'

Vue.use(Vueresource)
Vue.http.options.emulateJSON = true  // 启用该选项后，请求会以application/x-www-form-urlencoded作为MIME type，就像普通的HTML表单一样。

// ajax请求
function request (param, callback) {
  param['infocolect_channel'] = '0'
  param['op_source'] = '0'
  param['op_way'] = '0'
  var userInfo = getSStorageInfo('userInfo')
  var url = config.serverPath
  if (!!userInfo && !!userInfo.jsessionId && url.indexOf(';jessionid=') < 0) {
    url = url + ';jsessionid=' + userInfo.jsessionId
  }
  Vue.http.post(url, param).then(
    (res) => {
      // 响应成功回调
      callback(res.body)
    }, (res) => {
    // 响应错误回调
    console.log('Http Request failed' + res)
  })
}

// sessionStorage set 方法
function setSStorageInfo (key, value) {
  try {
    if (key !== '') {
      if (value instanceof Object) { // 如果是对象
        sessionStorage.setItem(key, JSON.stringify(value))
      } else {
        sessionStorage.setItem(key, value)
      }
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
      try {
        result = JSON.parse(result)
      } catch (e) {
      }
    } else {
      alert('key值不能为空')
    }
  } catch (e) {
    alert('您的浏览器不支持sessionStorage')
  }
  return result
}

function clearSStorage (key) {
  try {
    if (key !== '') {
      sessionStorage.removeItem(key)
    } else {
      sessionStorage.clear()
    }
  } catch (e) {
    alert('您的浏览器不支持sessionStorage')
  }
}

export {
  request,
  setSStorageInfo,
  getSStorageInfo,
  clearSStorage
}
