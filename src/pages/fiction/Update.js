import React from 'react'
import { Breadcrumb, Form, Input, Button } from 'element-react'
import 'element-theme-default'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ajax from '../../static/js/ajax'

class NewsUpdate extends React.Component {
  constructor (props) {
    super(props)

    // 如果有props.location.state 则定义detail 否则detail为空
    let detail = props.location.state ? props.location.state.data : ''

    // 预处理content将转移符转换为html标签
    let content = detail ? detail.content.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g, '') : ''
    console.log('detail --- ', detail)

    this.state = {
      form: {
        id: detail ? detail.id : '',
        // 标题
        title: detail ? detail.title : '',
        // 内容
        content: content,
        // 内容文本
        contentTxt: detail ? detail.contentTxt.substring(0, 150) : ''
      }
    }
  }

  onChange(key, value) {
    this.setState({
      form : Object.assign({}, this.state.form, { [key]: value })
    });
  }

  formButtonClick (e) {
    console.log(this.state.form.id)
    // e.preventDefault()
    this.newsUpdate()
  }

  newsUpdate () {
    let url = '/api/DMS/fiction/update'
    let data = this.state.form
    console.log(data)
    ajax('POST',url,data).then(res => {
      if(res.data.success === 'true'){
        this.props.history.push({pathname : `/fiction/list`})
      }
    })
  }

  render () {
    return (
      <div>
        <div className="part">
          <Breadcrumb separator="/">
            <Breadcrumb.Item>热门新闻</Breadcrumb.Item>
            <Breadcrumb.Item>添加/修改</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="part form">
          <Form labelWidth="80">

            <Form.Item label="小说标题">
              <Input type="text" value={this.state.form.title} placeholder="请输入小说标题" onChange={this.onChange.bind(this, 'title')}></Input>
            </Form.Item>

            <Form.Item label="内容">
              CKEditor
              <CKEditor
                  editor={ClassicEditor}
                  data={this.state.form.content}
                  onInit={editor => {}}
                  onChange={(event,editor) => {
                      let content = editor.getData()
                      // let contentTxt = (/<(?!img).*?>/g.test(content)) ? content.replace(/<(?!img).*?>/g,'') : content
                      // contentTxt = contentTxt.substring(0, 150)
                      let contentTxt = content.replace(/<[^<>]+>/g, '').substring(0, 150)
                      this.setState({
                        form : Object.assign({}, this.state.form, { content : content, contentTxt : contentTxt })
                      })
                  }}
                  onBlur={editor => {}}
                  onFocus={editor => {}}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={this.formButtonClick.bind(this)}>确定</Button>
            </Form.Item>

          </Form>
        </div>

      </div>
    )
  }
}

export default NewsUpdate