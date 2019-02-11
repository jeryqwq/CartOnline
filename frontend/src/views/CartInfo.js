import React from 'react';
import Header from './../components/Header'
import CartList from './../containers/CartList'
import {Pagination,Radio ,message} from 'antd'
import Category from './../components/Category'
import axios from 'axios';
const RadioGroup = Radio.Group;


export default class CartInfo extends React.Component{

    state={
        pageSize:8,
        pageNum:1,
        cartList:[],
        where:'1=1',
        value: 'createTime',
        cateId:0,
        total:0
    }
    componentDidMount(){
        this.getCart();
    }
    getCart(){
        axios.get('/getProduct',{
            params:{
                pageSize:this.state.pageSize,
                pageNum:this.state.pageNum,
                where:this.state.where,
                orderBy:this.state.value +" desc"
            }
        }).then((res)=>{
            if(res.data.state===0){
                this.setState({
                    cartList:res.data.data,
                    total:res.data.total
                })
            }else{
                message.info("该分类下还没数据")
            }
        })
    }
    onChange = (e) => {
        this.setState({
          value: e.target.value,
        },()=>{
            this.getCart()
        });
      }
   render(){

    return(
        <div>
            <Header current="item_1"/>
            <div style={{height:50,margin:"25px 0  0 50%"}}>
            <span>选择分类:</span><Category categoryId={(val)=>{
                this.setState({
                    cateId:val,
                    where:'cateId='+val
                },()=>{
                    this.getCart();
                })
            }}/>
            <RadioGroup style={{float:"right"}}
            onChange={this.onChange} value={this.state.value}>
            排序方式:&nbsp;&nbsp;
                <Radio value={'createTime'}>上架时间</Radio>
                <Radio value={'review'}>浏览量</Radio>
                <Radio value={'price'}>价格</Radio>
            </RadioGroup>
            </div>
            <CartList cartList={this.state.cartList}/>
            <Pagination style={{textAlign:'center',margin:"50px 0 30px 0"}} 
            defaultCurrent={1} total={this.state.total}
            onChange={(val)=>{
                this.setState({
                    pageNum:val
                },()=>{
                    this.getCart()
                })
            }}
            />
        </div>
    )
   }
}