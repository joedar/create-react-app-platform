import React from 'react'
import { Breadcrumb, Form, Input, Button } from 'element-react'
import 'element-theme-default'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ajax from '../../static/js/ajax'


class FictionAdd extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      form: {
        id: '',
        // 标题
        title: '',
        // 内容
        content: '',
        // 内容文本
        contentTxt: ''
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
    e.preventDefault()
    this.newsAdd()
  }

  newsAdd () {
    let url = '/api/DMS/fiction/add'
    let data = this.state.form
    console.log(data)
    ajax('POST',url,data).then(res => {
      if(res.data.success === 'true'){
        this.props.history.push({pathname : `/fiction/list`})
      }
    }).catch((err) => {
      console.log(err)
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

export default FictionAdd