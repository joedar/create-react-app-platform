import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Form, Input, Button, Message } from 'element-react'
import 'element-theme-default'
import ajax from '../static/js/ajax'
import Cookie from '../static/js/cookie'
import md5 from 'md5'


import '../static/css/loginex.css'

import Home from './Home'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: { username: '', password: '' },
      login: false
    }
  }

  handleEntryKey(e) {
    e.preventDefault()
    e.keyCode === 13 && this.goLogin()
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }

  openMessage(type, str) {
    Message({ message: str, type: type })
  }

  buttonSubmitClick(e) {
    e.preventDefault()
    this.goLogin()
  }

  goLogin() {
    let username = this.state.form.username
    let password = this.state.form.password
    if (!username) {
      this.openMessage('warning', '请输入管理员用户名')
      return
    }
    if (!password) {
      this.openMessage('warning', '请输入密码')
      return
    } else {
      password = md5(password)
    }

    // let pass = 'e0af9b69b6e594fbde5e1a53361dbef0'

    let data = new FormData()
    data.username = username
    data.password = password

    ajax('post', '/api/admin/login', data).then(res => {
      if (res.data.success === 'true') {
        if (res.data.data.token) {
          let nowTime = +new Date()
          Cookie.set('token', res.data.data.token)
          Cookie.set('tokenTime', nowTime)
          this.setState({
            login: true
          })
        } else {
          Cookie.del('token')
        }
      } else {
        this.openMessage('error', res.data.msg)
      }
    })
  }

  render() {

    // 如果已登录 跳转home页面
    if (this.state.login) {
      return (
        <Router>
          <Redirect to={{ pathname: '/home' }} />
          <Route path='/home' component={Home} />
        </Router>
      )
    }

    return (
      <div className="loginex">
        <div className="form">
          <Form ref="form">
            <Form.Item>
              <Input type="text" value={this.state.form.username} placeholder="请输入管理员用户名" onChange={this.onChange.bind(this, 'username')}></Input>
            </Form.Item>
            <Form.Item>
              <Input type="password" value={this.state.form.password} placeholder="请输入密码" onKeyUp={this.handleEntryKey.bind(this)} onChange={this.onChange.bind(this, 'password')}></Input>
            </Form.Item>
            <div className="display table center">
              <Button type="primary" onClick={this.buttonSubmitClick.bind(this)}>登录</Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default Login