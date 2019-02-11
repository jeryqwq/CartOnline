import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import {Row,Col,Input, InputNumber,Radio,Button} from 'antd'
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import Btn from './../containers/Btn';
import Category from './../components/Category';
import FileUpLoad from './../components/FileUpLoad';
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
        fileList:[]
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
      insertCart(){
          let subImg="";
          //to 组装Img信息，从fileUpload回调的文件列表中
        for (const key in this.state.fileList) {
            if (this.state.fileList.hasOwnProperty(key)) {
                console.log(this.state.fileList[key].response)
                if(this.state.fileList[key].response!==undefined){
                      subImg=subImg+this.state.fileList[key].response+","
                }
            }
        }
        axios.get("/addProduct",{
            params:{
                cateId:this.state.categoryId,
                pingpai:this.state.pingpai,
                title:this.state.title,
                desc:this.state.desc,
                status:this.state.status,
                price:this.state.price,
                img:this.state.fileList[0].response,
                subImgs:subImg,
                richText:this.state.text
            }
        }).then((res)=>{
          console.log(res);
        })
        console.log(subImg)
      }
      render() {
        return (
         <div style={{margin:'10px',paddingTop:1,textAlign:'center'}}>
            <Row gutter={16}>
              {Btn(this,'title','车辆名称',"请输入车辆名称")}
              {Btn(this,'pingpai','车辆品牌',"请输入车辆品牌")}
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
                    })}} 
                    value={this.state.status}>
                    是否上架:&nbsp;&nbsp;
                        <Radio value={1}>立刻上架</Radio>
                        <Radio value={0}>先下架</Radio>
                    </RadioGroup>
                </Col>
                <Col span={12}>
                    <label style={{color:'#333333'}}>车辆描述<br/>
                    <Input.TextArea value={this.state.desc} onChange={(event)=>{
                        this.setState({desc:event.target.value})
                    }}
                    placeholder="请输入车辆描述信息" style={{border:'solid 1px rgba(0,0,0,.4)',margin:'10px '}}/>
                    </label>
                </Col>
                <Col span={12}>
                    <FileUpLoad setImg={(imgs)=>{this.setState({
                        fileList:imgs
                    })}} imgCount={7} title="图片信息(最多可上传六张)"/>
                </Col>
            </Row>
    
            <ReactQuill 
            value={this.state.text}
            modules={this.modules}
            formats={this.formats}
            onChange={(value)=>{
                this.setState({ text: value })
            }} />
            <Button onClick={()=>{
                this.insertCart();
            }} 
             style={{float:"right",margin:"30px"}} type="primary" shape="round" icon="upload" size='large'>上传</Button>

         </div>
        )
      }
}
