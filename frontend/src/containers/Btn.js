import React from 'react';
import {Col,Input} from 'antd'
export default function(that,stateName,name,ph){
    return<Col span={12}>
            <label style={{color:'#333333'}}>{name}<br/>
            <Input value={that[stateName]} onChange={(val)=>{
                that.setState({[stateName]:val})
            }}
            placeholder={ph} style={{border:'solid 1px rgba(0,0,0,.4)',margin:'10px '}}/>
            </label>
        </Col>
    
}