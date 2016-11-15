//var root = 'http://192.168.12.126:8021/api/v2';
var root = '//tdq.yaoyingli.com/api/v2';

var request = require('superagent');
var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}


function filter_null(o) {
  for (var key in o) {
    if (o[key] == null) {
      delete o[key]
    }
    if (toType(o[key]) == 'string') {
      o[key] = o[key].trim()
      if (o[key].length == 0) {
        delete o[key]
      }
    }
  }
  return o
}

function _api_base(method, url, params, success, failure) {
  var r = request(method, url).type('text/plain').withCredentials()
  if (params) {
    params = filter_null(params);
    if (method === 'POST' || method === 'PUT') {
      if (toType(params) == 'object') {
        params = JSON.stringify(params);
      }
      r = r.send(params)
    } else if (method == 'GET' || method === 'DELETE') {
      r = r.query(params)
    }
  }
  r.end(function(err, res) {
    if (err) {
      if (res.status == 401) {
        // location.href = '/html/#!/login'
        alert('登录过期，请关闭页面后重新打开')
      } else {
        alert('api error, HTTP CODE: ' + res.status);
        return;
      };
    };
    if (res.body.status == 0) {
      if (success) {
        success(res.body);
      }
    } else {
      if (failure) {
        failure(res.body);
      } else {
        alert('error: ' + JSON.stringify(res.body));
      }
    }
  });
};

export default {
  get: function(url, params, success, failure) {
    return _api_base('GET', root + '/' + url, params, success, failure)
  },
  post: function(url, params, success, failure) {
    return _api_base('POST', root + '/' + url, params, success, failure)
  },
  put: function(url, params, success, failure) {
    return _api_base('PUT', root + '/' + url, params, success, failure)
  },
  delete: function(url, params, success, failure) {
    return _api_base('DELETE', root + '/' + url, params, success, failure)
  },
}
