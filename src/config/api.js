// 配置API接口地址
var root = process.env.API_ADDR
// 引用superagent
var request = require('superagent')
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
      if (o[key].length === 0) {
        delete o[key]
      }
    }
  }
  return o
}
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
*/
function apiBase (method, url, params, success, failure) {
  var r = request(method, url).type('text/plain')
  if (params) {
    params = filterNull(params)
    if (method === 'POST' || method === 'PUT') {
      if (toType(params) === 'object') {
        params = JSON.stringify(params)
      }
      r = r.send(params)
    } else if (method === 'GET' || method === 'DELETE') {
      r = r.query(params)
    }
  }
  r.end(function (err, res) {
    if (err) {
      window.alert('api error, HTTP CODE: ' + res.status)
      return
    };
    if (res.body.success === true) {
      if (success) {
        success(res.body)
      }
    } else {
      if (failure) {
        failure(res.body)
      } else {
        window.alert('error: ' + JSON.stringify(res.body))
      }
    }
  })
}
// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiBase('GET', root + '/' + url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiBase('POST', root + '/' + url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiBase('PUT', root + '/' + url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiBase('DELETE', root + '/' + url, params, success, failure)
  }
}
