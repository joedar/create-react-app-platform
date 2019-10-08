import React from 'react'
import { Breadcrumb, Table, Button, Pagination } from 'element-react'
import 'element-theme-default'
import ajax from '../../static/js/ajax'

class FictionList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      columns : [
        {label: "ID", prop: "id", width: 100}
        ,{label: "标题", prop: "title"}
        ,{label: "创建日期", prop: "createDate"}
        ,{label: "内容", prop: "contentTxt"}
        ,{label: "操作", width: 150,
          render: (row, column, index)=>{
            return (
              <div>
                <span>
                  <Button type="text" size="small" onClick={() => this.updateClick(row)}>修改</Button>
                  <Button type="text" size="small" onClick={() => this.deleteClick(row.id)}>移除</Button>
                </span>
              </div>
            )
          }
        }
      ]
      ,data : {}

      ,page : 1
      ,pageSize : 5
    }

    // this.getList()
  }

  componentDidMount () {
    console.log('componentDidMount -- this.state -- ',this.state)
    this.getList()
  }

  // 执行编辑操作 跳回 /fiction/update
  updateClick (row) {
    this.props.history.push({pathname: `/fiction/update/${row.id}`, state: {data: row}})
  }

  // 执行删除操作
  deleteClick (id) {
    let url = '/api/DMS/fiction/delete'
    let data = {id}
    ajax('post',url,data).then(res => {
      (res.data.success === 'true') && this.getList()
    })
  }

  // 获取列表
  getList () {
    let url = '/api/DMS/fiction/list'
    let data = {page : this.state.page, pageSize : this.state.pageSize}
    ajax('post',url,data).then(res => {
      if(res.data.success === 'true'){
        this.setState({data : res.data.data})
      }else{
        console.log('获取数据失败')
      }
    })
  }

  onSizeChange (pageSize) {
    this.setState(
      Object.assign({}, { pageSize })
      ,() => this.getList()
    )
  }

  goCurrentChange (page) {
    this.setState(
      Object.assign({}, { page })
      ,() => this.getList()
    )
  }

  render () {
    return (
      <div>

        <div className="part">
          <Breadcrumb separator="/">
            <Breadcrumb.Item>热门新闻</Breadcrumb.Item>
            <Breadcrumb.Item>列表</Breadcrumb.Item>
          </Breadcrumb>
        </div>



        <div className="part">
          <Table
            style={{width: '100%'}}
            columns={this.state.columns}
            data={this.state.data.list}
            border={true}
          />
        </div>

        <div className="part">
          <Pagination
            layout="total, sizes, prev, pager, next, jumper"
            total={this.state.data.totalCount}
            pageSize={this.state.pageSize}
            pageSizes={[5,10,15,20]}
            currentPage={this.state.page}
            onSizeChange={this.onSizeChange.bind(this)}
            onCurrentChange={this.goCurrentChange.bind(this)}
          />
        </div>

      </div>
    )
  }
}

export default FictionList

