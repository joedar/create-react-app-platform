import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { Menu, Button } from 'element-react'
import 'element-theme-default'
import ajax from '../static/js/ajax'
import Cookie from '../static/js/cookie'

import Login from './Login'

import DashBoard from './DashBoard/index'
// 引入组件 NewsList
import NewsList from './news/List'
// 引入组件 NewsAdd
import NewsAdd from './news/Add'
// 引入组件 NewsUpdate
import NewsUpdate from './news/Update'
// 引入组件 FictionList
import FictionList from './fiction/List'
// 引入组件 FictionAdd
import FictionAdd from './fiction/Add'
// 引入组件 FictionUpdate
import FictionUpdate from './fiction/Update'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      login: true
    }
  }

  logoutButtonClick () {
    // e.preventDefault()
    ajax('get','/api/admin/logout').then((res) => {
      // 清除cookie里的token
      Cookie.del('token')
      Cookie.del('tokenTime')
      // 设置state
      this.setState({
        login: false
      })
    })
  }

  render () {

    // 如果已退出登录
    if (!this.state.login) {
      return (
        <Router>
          <Redirect to={{ pathname: '/login' }} />
            <Route path='/login' component={ Login } />
        </Router>
      )
    }

    return (
      <Router>
        <div className="App">
          
          <div className="leftMenu">
            <Menu className="el-menu-vertical-demo sidebar" theme="dark">
              <Button type="primary" onClick={this.logoutButtonClick.bind(this)}>退出登录</Button>
              <Link to="/home"><Menu.Item index="">首页</Menu.Item></Link>
              <Menu.SubMenu defaultActive="news-list" index="news" title="热门新闻">
                <Link to="/news/list"><Menu.Item index="news-list">列表</Menu.Item></Link>
                <Link to="/news/add"><Menu.Item index="news-add-edit">添加</Menu.Item></Link>
              </Menu.SubMenu>
              <Menu.SubMenu defaultActive="fiction-list" index="fiction" title="小说">
                <Link to="/fiction/list"><Menu.Item index="fiction-list">列表</Menu.Item></Link>
                <Link to="/fiction/add"><Menu.Item index="fiction-add-edit">添加</Menu.Item></Link>
              </Menu.SubMenu>
            </Menu>
          </div>
          
          <div className="rightContain sidebar">
            <div className="contain">
              <Route path="/home" component={ DashBoard } />
              <Route path="/news/list" component={ NewsList } />
              <Route path="/news/add" component={ NewsAdd } />
              <Route path="/news/update" component={ NewsUpdate } />
              <Route path="/fiction/list" component={ FictionList } />
              <Route path="/fiction/add" component={ FictionAdd } />
              <Route path="/fiction/update" component={ FictionUpdate } />
            </div>
          </div>

        </div>
      </Router>
    )
  }
}

export default Home