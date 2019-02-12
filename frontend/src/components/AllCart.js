import React from 'react';
import {message,Icon,Pagination,Button} from 'antd'
import axios from 'axios'
import './../statics/css/index.css'


export default class AllCart extends React.Component{
    constructor(props){
        super(props);
        this.state={
            pageSize:8,
            pageNum:1,
            cartList:[],
            where:'1=1',
            total:0
        }
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
                orderBy:'createTime'
            }
        }).then((res)=>{
            if(res.data.state===0){
                this.setState({
                    cartList:res.data.data,
                    total:res.data.total
                })
            }else{
                message.info("已经没有数据啦")
            }
        })
    }
    tabStatus(status,id){
        axios.get('/tabStatus',{
            params:{
                status,
                id
            }
        }).then((res)=>{
            if(res.data.state===0){
                this.getCart();
                message.info("操作成功!")
            }
        })
    }
    render(){
        return(
            <div style={{paddingTop:40}}>
          <div className="content-wrap">
         {
             this.state.cartList.map((item,index)=>(
                <div key={index} className="content-item">
                <span className="left-top"></span>
                <span className="left-bottom"></span>
                <span className="right-top"></span>
                <span className="right-bottom"></span>
                <img src={item.img}/>
                <h3>{item.title} <span style={{float:"right"}}>{Math.round(item.price/10000)}<span style={{fontSize:15}}>万元</span><span style={{fontSize:12}}>{item.price}</span></span></h3>
                <h4>{item.desc}</h4>
                <Button onClick={()=>{
                    this.props.setCartId(item.id)
                }}
                 type="primary">
            编辑<Icon type="edit" /> 
                </Button>
               {
                   item.status===1? <Button onClick={()=>{
                       this.tabStatus(0,item.id);
                   }}
                   type="primary" style={{float:"right"}}>
                   下架<Icon type="fall"  style={{color:'red'}}/> 
                       </Button>:<Button onClick={()=>{
                        this.tabStatus(1,item.id);
                    }}
                    type="primary" style={{float:"right"}}>
                   上架<Icon type="rise" /> 
                       </Button>
               }
                {/* <span style={{float:"right",marginRight:20}}><Icon type="eye" style={{marginRight:10}} />{item.review}</span> */}
            </div>
             ))
         }
        </div>
                  <Pagination style={{textAlign:'center',padding:"40px 0 30px 0"}} 
                  onChange={(val)=>{
                   this.setState({
                       pageNum:val
                   },()=>{
                       this.getCart();
                   })
                  }}
            defaultCurrent={1} total={this.state.total} />
            </div>
        )
    }
}