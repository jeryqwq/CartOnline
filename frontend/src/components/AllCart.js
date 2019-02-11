import React from 'react';
import {Card,message,Icon,Pagination} from 'antd'
import axios from 'axios'


const { Meta } = Card;

export default class AllCart extends React.Component{
    state={
        pageSize:8,
        pageNum:1,
        cartList:[],
        where:'1=1'
    }
    componentDidMount(){
        this.getCart();
    }
    getCart(){
        axios.get('/getProduct',{
            params:{
                pageSize:this.state.pageSize,
                pageNum:this.state.pageNum,
                where:this.state.where
            }
        }).then((res)=>{
            if(res.data.state===0){
                this.setState({
                    cartList:res.data.data
                })
            }else{
                message.info("已经没有数据啦")
            }
        })
    }
    render(){
        return(
            <div style={{paddingTop:40}}>
          {
              this.state.cartList.map((item,index)=>(
                    <Card  key={item.id}
                style={{ width: 'calc( 25% - 20px)',display:'inline-block',marginLeft:20,marginTop:20 }}
                cover={<img alt="example" src={item.img} style={{height:240}} />}
                actions={[ <span><Icon type="edit" />编辑</span>,<span><Icon type="fall" />下架</span>]}
                >
                <Meta
                avatar={<span>{item.status===1?<span><Icon style={{color:'red'}} type="eye" />已上架</span>:<span style={{textDecoration:'line-through'}}><Icon  type="eye-invisible" />已下架</span>}<br/>￥{item.price/1000}万元</span>}
                title={item.title}
                description={item.desc}
                />
                </Card>
              ))
          }
                  <Pagination style={{textAlign:'center',margin:"40px 0 30px 0"}} 
                  onChange={(val)=>{
                   this.setState({
                       pageNum:val
                   },()=>{
                       this.getCart();
                   })
                  }}
            defaultCurrent={1} total={50} />
            </div>
        )
    }
}