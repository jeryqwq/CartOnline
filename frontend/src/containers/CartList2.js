import React from 'react';
import {Card,Avatar,Icon} from 'antd'
import './../statics/css/important.css'


const { Meta } = Card;

export default function(props){
 
 
        return(
            <div style={{width:'85%',margin:'20px auto',textAlign:'center'}}>
          {
              props.cartList.map((item,index)=>(
                <Card key={index}
                hoverable
                style={{ width: 'calc(25% - 80px)' ,height:300,display:'inline-block',margin:10}}
                cover={<img alt={item.pingpai} src={item.img} style={{width:'100%',height:200}} />}
              >
                <Meta
                
                  title={item.title}
                  description={item.desc}
                />
              </Card>
              ))
          }
            </div>
        )
    
}