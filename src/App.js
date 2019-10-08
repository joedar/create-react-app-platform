import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
// 引入ajax请求Promise
import ajax from './static/js/ajax'
// 引入Cookie
import Cookie from './static/js/cookie'

import Login from './pages/Login'
import Home from './pages/Home'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      //--------------------------
      // 用来判断是否登录
      // 登录了/home, 未登录/login
      //--------------------------
      currentPath: '/'
    }
  }
  componentDidMount () {
    // 判断是否已登录
    this.isLogined()
  }
  // 判断是否已登录
  isLogined () {
    //----------------------------------------------------------
    // 首先获取Cookie里的token
    // 如果存在，就带上token去请求'/api/admin/isLogin'
    //     请求返回true 就表示已登录 logined = true
    //     请求返回false 就表示未登录或已退出登录 logined = false
    //         移除cookie里的token
    // 如果不存在，就表示未登录或已退出登录 logined = false
    //----------------------------------------------------------
    let token = Cookie.get('token')
    if (token) {
      ajax('get', '/api/admin/isLogin').then((res) => {
        this.setState({
          currentPath: (res.data.success === 'true') ? '/home' : '/login'
        })
        if (res.data.success !== 'true') {
          Cookie.del('token')
          Cookie.del('tokenTime')
        }
      }).catch((err) => {
        console.log(err)
      })
    } else {
      this.setState({ currentPath: '/login' })
    }
  }
  render () {
    return (
      <Router>
        <Redirect to={{ pathname: this.state.currentPath }} />
        <Route path='/home' component={Home} />
        <Route path='/login' component={Login} />
      </Router>
    )
  }
}

export default App;
