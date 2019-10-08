import axios from 'axios'
import qs from 'qs'
import Cookie from './cookie'

const ajax = (method, url, data) => {
  let met = method.toLowerCase()

  function back() {
    // 清除cookie
    Cookie.del('token')
    Cookie.del('tokenTime')
    // 页面跳转首页
    location.href = '/'
  }

  // 获取token写入cookie里的时间戳
  let tokenTime = Number(Cookie.get('tokenTime'))
  let isLoginApi = (/login|logout/g.test(url))
  if (!isLoginApi) {
    // 定义变量为当前时间
    let nowTime = +new Date()
    // 定义变量过期的时间
    let expires = 1800 * 1000
    // 如果尚未过期
    if (nowTime - tokenTime < expires) {
      // 更新tokenTime
      Cookie.set('tokenTime', nowTime)
    // 如果已过期
    } else {
      back()
    }
  }


  if(met === 'post'){
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(data)).then(res => {
        if (res) {
          if (!isLoginApi && res.data === 'Exited') {
            back()
          } else {
            resolve(res)
          }
        } else {
          reject(res.status)
        }
      })
    })
  }
  else if(met === 'get'){
    return new Promise((resolve,reject) => {
      axios.get(url).then(res => {
        if (res) {
          if (!isLoginApi && res.data === 'Exited') {
            back()
          } else {
            resolve(res)
          }
        } else {
          reject(res.status)
        }
      })
    })
  }
}

export default ajax
