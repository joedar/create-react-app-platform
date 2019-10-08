import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Menu, Button } from 'element-react'
import 'element-theme-default'
import ajax from '../ajax'

// 引入组件 Home
import Home from './Home'
// 引入组件 NewsList
import NewsList from './news/List'
// 引入组件 NewsAdd
import NewsAdd from './news/Add'
// 引入组件 FictionList
import FictionList from './fiction/List'
// 引入组件 FictionAdd
import FictionAdd from './fiction/Add'

class Logined extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  logoutButtonClick (e) {
    e.preventDefault()
    ajax('get','/api/admin/logout').then(res => {
      if(res.data.success === 'true'){
        location.reload()
      }
    })
  }

  render () {
    return (
      <Router>
        <div className="App">
          
          <div className="leftMenu">
            <Menu className="el-menu-vertical-demo sidebar" theme="dark">
              <Button type="primary" onClick={this.logoutButtonClick.bind(this)}>退出登录</Button>
              <Link to="/"><Menu.Item index="news-add-edit">首页</Menu.Item></Link>
              <Menu.SubMenu defaultActive="news-list" index="news" title="热门新闻">
                <Link to="/news/list"><Menu.Item index="news-list">列表</Menu.Item></Link>
                <Link to="/news/add"><Menu.Item index="news-add-edit">添加/修改</Menu.Item></Link>
              </Menu.SubMenu>
              <Menu.SubMenu defaultActive="fiction-list" index="fiction" title="小说">
                <Link to="/fiction/list"><Menu.Item index="fiction-list">列表</Menu.Item></Link>
                <Link to="/fiction/add"><Menu.Item index="fiction-add-edit">添加/修改</Menu.Item></Link>
              </Menu.SubMenu>
            </Menu>
          </div>

          <div className="rightContain sidebar">
            <div className="contain">
              <Route exact path="/" component={Home} />
              <Route path="/news/list" component={NewsList} />
              <Route path="/news/add" component={NewsAdd} />
              <Route path="/fiction/list" component={FictionList} />
              <Route path="/fiction/add" component={FictionAdd} />
            </div>
          </div>

        </div>
      </Router>
    )
  }
}

export default Logined