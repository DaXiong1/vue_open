import * as $ from '../utils/base'

// 获取url中的参数
function getUrlParam (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
  var r = window.location.hash.substr(3).match(reg)  // 匹配目标参数
  if (r != null) return unescape(r[2]); return null // 返回参数值
}

/**
 * 查询字典方法 参数为对象
 * 可以直接传入key或者value来返回对应的值 比如[{a:1,b:2}]  传入key=a返回1 传入value=1返回a
 * 也可以不传key和value 直接返回整个字典数组
 * @param d{type 数据字典类型 Y, key 查询键, value 查询值}
 * @param f 回调函数 参数返回数组或对象 [{key:1, value:2}]
 */
function queryDictionary (d, f) {
  var dictionaryCacheName = 'dictionary_' + d.type
  var callback = function (data) {
    if (data && data.length > 0) {
      var arr = []
      for (var s = 0; s < data.length; s++) {
        var t = {
          key: data[s].item_value,
          value: data[s].item_name
        }
        if ((d.key && d.key === t.key) || (d.value && d.value === t.value)) { f(t); return }
        arr.push(t)
      }
      f(arr); return
    }
    f('')
  }

  var dc = sessionStorage.getItem(dictionaryCacheName)
  if (dc) {
    callback(JSON.parse(dc))
  } else {
    $.request({funcNo: 501501, enum_type: d.type}, function (data) {
      if (data.error_no === '0' && data.results && data.results.length > 0) {
        sessionStorage.setItem(dictionaryCacheName, JSON.stringify(data.results))
        callback(data.results)
      } else {
        callback(0)
      }
    })
  }
}

/**
 * 身份证号获取出生日期
 * @param c 身份证号码 15或18位
 * @returns 返回格式 1994-07-01
 */
function idCardToBirthday (c) {
  if (c) {
    if (c.length === 18) {
      return c.replace(/\d{6}(\d{4})(\d{2})(\d{2})\d{3}[\dXx]/, '$1-$2-$3')
    } else if (c.length === 15) {
      return c.replace(/\d{6}(\d{2})(\d{2})(\d{2})\d{3}/, '19$1-$2-$3')
    }
  }
}

export {
  getUrlParam,
  queryDictionary,
  idCardToBirthday
}
