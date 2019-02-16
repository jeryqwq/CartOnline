import React ,{useState}from 'react';
import {Card} from 'antd'
import './../statics/css/important.css'
import {Link} from 'react-router-dom'


const { Meta } = Card;

export default function(props){
        return(
            <div style={{width:'85%',margin:'20px auto',textAlign:'center'}}>
          {
              props.cartList.map((item,index)=>(
                <Link key={index} to={"/Product/"+item.id}>
               <div  className="item-cart-cj" key={index} style={{ width: 'calc(25% - 80px)' ,height:300,display:'inline-block',margin:10}}>
                <div className="active-card"></div>
        
                <Card 
                hoverable
                
                cover={<img alt={item.pingpai} src={item.img} style={{width:'100%',height:200}} />}
              >
                <Meta
                  title={item.title}
                  description={item.desc}
                />
              </Card>
               </div>
               </Link>
              ))
          }
            </div>
        )
    
}