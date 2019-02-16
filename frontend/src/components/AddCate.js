import React from 'react'
import {
    message, Input, 
  } from 'antd';
import Axios from 'axios';
  const Search = Input.Search;
  const { TextArea } = Input;

export default class AddCate extends React.Component{

    state={
        cateName:'',
        cateDesc:''
    }
    addCate(){
        Axios.get('/addCategory',{
            params:{
                cateName:this.state.cateName,
            cateDesc:this.state.cateDesc
            }
        }).then((res)=>{
            if(res.data.state==0){
                message.info("新增成功!")
            }
        })
    }
    render(){
        return(
            <div style={{textAlign:"center"}}>
            <Search
                style={{marginTop:50,width:300}}
                placeholder="请输入分类名称"
                enterButton="添加"
                size="large"
                onSearch={value => this.setState({
                    cateName:value
                },()=>{
                    this.addCate();
                })}
                />
                <TextArea 
                style={{marginTop:50,width:500,display:'block',margin:'30px auto'}}
                placeholder="请输入分类描述，可不写"
                rows={4} onChange={(val)=>{
                    this.setState({
                        cateDesc:val.target.value
                    })
                }}/>
            </div>
        )
    }
}