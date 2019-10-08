import React from 'react'
import { Breadcrumb, Form, Input, Select, Button } from 'element-react'
import 'element-theme-default'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ajax from '../../static/js/ajax'


class NewsAdd extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      form: {
        id: '',
        // 标题
        title: '',
        // 分类
        category: '',
        // 来源
        source: '',
        // 来源链接
        sourceLink: '',
        // 封面图片
        coverImg: '',
        // 内容
        content: '',
        // 内容文本
        contentTxt: '',
      },
      // 分类选项
      options: [
        {value: '要闻', label: '要闻'},
        {value: '电影', label: '电影'},
        {value: '电视剧', label: '电视剧'},
        {value: '综艺', label: '综艺'},
        {value: '音乐', label: '音乐'},
        {value: '明星', label: '明星'},
        {value: '视频', label: '视频'},
        {value: '购物', label: '购物'},
        {value: '时尚', label: '时尚'},
        {value: '旅游', label: '旅游'},
        {value: '教育', label: '教育'},
        {value: '亲子', label: '亲子'}
      ]
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
    let url = '/api/DMS/news/add'
    let data = this.state.form
    console.log(data)
    ajax('POST',url,data).then(res => {
      if(res.data.success === 'true'){
        this.props.history.push({pathname : `/news/list`})
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

            <Form.Item label="新闻标题">
              <Input type="text" value={this.state.form.title} placeholder="请输入新闻标题" onChange={this.onChange.bind(this, 'title')}></Input>
            </Form.Item>

            <Form.Item label="分类">
              <Select value={this.state.form.category} placeholder="请选择" onChange={this.onChange.bind(this, 'category')}>
                {
                  this.state.options.map(el => {
                    return <Select.Option key={el.value} label={el.label} value={el.value} />
                  })
                }
              </Select>
            </Form.Item>

            <Form.Item label="来源">
              <Input type="text" value={this.state.form.source} placeholder="请输入新闻来源" onChange={this.onChange.bind(this, 'source')}></Input>
            </Form.Item>

            <Form.Item label="来源链接">
              <Input type="text" value={this.state.form.sourceLink} placeholder="请输入新闻来源链接" onChange={this.onChange.bind(this, 'sourceLink')}></Input>
            </Form.Item>

            <Form.Item label="封面图片">
              <Input type="text" value={this.state.form.coverImg} placeholder="请输入封面图片链接" onChange={this.onChange.bind(this, 'coverImg')}></Input>
            </Form.Item>

            <Form.Item label="内容">
              CKEditor
              <CKEditor
                  editor={ClassicEditor}
                  data={this.state.form.content}
                  onInit={editor => {}}
                  onChange={(event,editor) => {
                      let content = editor.getData()
                      let contentTxt = (/<(?!img).*?>/g.test(content)) ? content.replace(/<(?!img).*?>/g,'') : content
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

export default NewsAdd