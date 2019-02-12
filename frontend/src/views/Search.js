import React from 'react';
import Header from './../components/Header';
import {Select,Input ,Pagination,message} from 'antd'
import CartList from './../containers/CartList2';
import axios from 'axios'
const Option = Select.Option;

export default class Search extends React.Component{
   
    constructor(props){
        super(props)
        this.state={
            key:'globel',
            value:'1',
            pageSize:8,
            pageNum:1,
            cartList:[],
            orderBy:'createTime',
            total:0
        }
    }
    componentDidMount(){
        this.getCarts()
    }
    getCarts(){
        axios.get('/getProduct',{
            params:{
                pageSize:this.state.pageSize,
                pageNum:this.state.pageNum,
                where:this.state.key==='globel'?"1 = 1":"`"+this.state.key+"`"+" like "+"'%"+this.state.value+"%'",
                orderBy:this.state.orderBy +" desc"
            }
        }).then((res)=>{
            if(res.data.state===0){
                this.setState({
                    cartList:res.data.data,
                    total:res.data.total
                })
            }else{
                message.info("没查到任何信息，切换写查询方式吧")
            }
        })
    }
    render(){
        return (
            <div>
                <Header current="item_2"/>
               <div style={{textAlign:'center',margin:'50px 0 0 0'}}>
               <Select onChange={(val)=>{
                   this.setState({
                       key:val.key
                   })
               }}
               labelInValue defaultValue={{ key: 'global' }} style={{ width: 120 }} >
                    <Option value="global">全局匹配</Option>
                    <Option value="title">车辆名称</Option>
                    <Option value="pingpai">车辆品牌</Option>
                    <Option value="desc">车辆描述</Option>
                </Select>
                <Input.Search onChange={(event)=>{
                    console.log(event.target.value)
                    this.setState({
                        value:event.target.value,
                        pageNum:1
                    })
                }} enterButton={true}
                onSearch={()=>{
                    this.getCarts()
                }}
                style={{width:200,marginLeft:50}} placeholder="请输入关键词" />
               </div>
               <CartList cartList={this.state.cartList}/>
               <Pagination 
               onChange={(val)=>{
                    this.setState({
                        pageNum:val
                    },()=>{
                        this.getCarts()
                    })
               }}
               style={{textAlign:'center',margin:"50px 0 30px 0"}} 
                defaultCurrent={1} total={this.state.total} />
            </div>
        )
    }
}