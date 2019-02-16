import React, { useState } from 'react'
import './../statics/css/index.css'
import {Link} from 'react-router-dom'
import {Button,Icon} from 'antd'
export default function(props){
    return (
     <div style={{width:'85%',margin:'30px auto'}}>

        <div className="content-wrap">
         {
             props.cartList.map((item,index)=>(
                 <Link key={index} to={"/Product/"+item.id}>
                <div  className="content-item">
                <span className="left-top"></span>
                <span className="left-bottom"></span>
                <span className="right-top"></span>
                <span className="right-bottom"></span>
                <img src={item.img}/>
                <h3>{item.title} <span style={{float:"right"}}>￥{item.price/10000}<span style={{fontSize:15}}>万元</span></span></h3>
                <h4>{item.desc}</h4>
                <Button 
                type="primary">
            查看详情<Icon type="right" /> 
                </Button>
                <span style={{float:"right",marginRight:20}}><Icon type="eye" style={{marginRight:10}} />{item.review}</span>
            </div>
            </Link>
             ))
         }
        </div>
     </div>
    )
}