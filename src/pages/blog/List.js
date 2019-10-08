import React from 'react'
import { Breadcrumb, Table, Button, Pagination } from 'element-react'
import 'element-theme-default'
import ajax from '../../static/js/ajax'

class BlogList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      columns : [
        {label: "ID", prop: "id", width: 100}
        ,{label: "标题", prop: "title"}
        ,{label: "分类", prop: "category"}
        ,{label: "来源", prop: "source"}
        ,{label: "封面图片", render : (row, column, index) => {
          return row.coverImg ? <span>有</span> : <span>--</span>
        }}
        ,{label: "创建日期", prop: "createDate"}
        ,{label: "操作", width: 150,
          render: (row, column, index)=>{
            return (
              <div>
                <span>
                  <Button type="text" size="small" onClick={() => this.editClick(row)}>修改</Button>
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

    this.getList()
  }

  componentDidMount () {
    console.log('componentDidMount -- this.state -- ',this.state)
    this.getList()
  }

  // 执行编辑操作 跳回 /blog/add
  editClick (row) {
    this.props.history.push({pathname: `/blog/add/${row.id}`, state: {data: row}})
  }

  // 执行删除操作
  deleteClick (id) {
    let url = '/api/DMS/blog/delete'
    let data = {id}
    ajax('post',url,data).then(res => {
      (res.data.success === 'true') && this.getList()
    })
  }

  // 获取列表
  getList () {
    let url = '/api/DMS/blog/list'
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
            <Breadcrumb.Item>博客</Breadcrumb.Item>
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

export default BlogList

