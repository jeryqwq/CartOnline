import React, {Component} from 'react';
import ReactQuill from 'react-quill'; // ES6
import {Row,Col,Input, InputNumber,Radio} from 'antd'
import 'react-quill/dist/quill.snow.css'; // ES6
import Btn from './../containers/Btn'
import Category from './../components/Category'
import FileUpLoad from './../components/FileUpLoad'
const RadioGroup = Radio.Group;
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = { text: '',
        title:'',
        categoryId:'',
        desc:'',
        status:1,
        price:0,
        pingpai:'',
        img:'',
        subImg:'',
     
    } // You can also pass a Quill Delta here
}
      modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
    
      formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]
      render() {
        return (
         <div style={{margin:'10px',paddingTop:1,textAlign:'center'}}>
            <Row gutter={16}>
              {Btn(this,'title','车辆名称',"请输入车辆名称")}
              {Btn(this,'title','车辆品牌',"请输入车辆品牌")}
              <Col span={6}>
                    <label style={{color:'#333333'}}>车辆价格<br/>
                    <InputNumber value={this.state.price} onChange={(val)=>{
                        this.setState({price:val})
                    }}
                    placeholder="请输入车辆价格" style={{border:'solid 1px rgba(0,0,0,.4)',margin:'10px '}}/>
                    </label>
                </Col>
                <Col span={6}>
                    <label style={{color:'#333333'}}>请选择分类<br/>
                    <Category 
                     categoryId={(id)=>{this.setState({categoryId:id})}}/>
                    </label>
                </Col>
                <Col span={12}>
                    <RadioGroup style={{color:'#333333',margin:'30px 0 30px 0'}}
                    onChange={(e)=>{
                        this.setState({
                        status:e.target.value
                    })}} value={this.state.status}>
                    是否上架:&nbsp;&nbsp;
                        <Radio value={1}>立刻上架</Radio>
                        <Radio value={0}>先下架</Radio>
                    </RadioGroup>
                </Col>
                <Col span={12}>
                    <label style={{color:'#333333'}}>车辆描述<br/>
                    <Input.TextArea value={this.state.desc} onChange={(val)=>{
                        this.setState({desc:val})
                    }}
                    placeholder="请输入车辆描述信息" style={{border:'solid 1px rgba(0,0,0,.4)',margin:'10px '}}/>
                    </label>
                </Col>
                <Col span={12}>
                    <FileUpLoad imgCount={1} title="主图(可上传一张)"/>
                    <FileUpLoad imgCount={3} title="附图(可上传三张)"/>

                </Col>
            </Row>
    
            <ReactQuill 
            value={this.state.text}
            modules={this.modules}
            formats={this.formats}
            onChange={(value)=>{
                this.setState({ text: value })
            }} />
         </div>
        )
      }
}
