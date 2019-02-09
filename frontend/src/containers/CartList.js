import React from 'react'
import './../statics/css/index.css'
import {Button,Icon} from 'antd'
export default function(){
    return (
     <div>

        <div className="content-wrap">
         {
             [1,2,3,4,5,6,7,8].map((item,index)=>(
                <div key={index} className="content-item">
                <span className="left-top"></span>
                <span className="left-bottom"></span>
                <span className="right-top"></span>
                <span className="right-bottom"></span>
                <img src={require('./../statics/images/cart1.png')}/>
                <h3>xxxx款 <span style={{float:"right"}}>￥920</span></h3>
                <h4>xxxx款式岁的卡就是大量亏损点解啊离开啊爱色刀口浪尖阿萨德看xxxx款式岁的卡就是大量亏损点解啊离开啊爱色刀口浪尖阿萨德看xxxx款式岁的卡就是大量亏损点解啊离开啊爱色刀口浪尖阿萨德看</h4>
                <Button type="primary">
            查看详情<Icon type="right" /> 
                </Button>
                <span style={{float:"right",marginRight:20}}><Icon type="eye" style={{marginRight:10}} />552</span>
            </div>
             ))
         }
        </div>
     </div>
    )
}