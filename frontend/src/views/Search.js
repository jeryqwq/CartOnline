import React from 'react';
import Header from './../components/Header';
import {Select,Input } from 'antd'
export default function(){
    const Option = Select.Option;
    return (
        <div>
            <Header current="item_2"/>
           <div style={{textAlign:'center',margin:'50px 0 0 0'}}>
           <Select labelInValue defaultValue={{ key: 'global' }} style={{ width: 120 }} >
                <Option value="global">全局匹配</Option>
                <Option value="jack">车辆编号</Option>
                <Option value="lucy">车辆名称</Option>
                <Option value="lucy">车辆信息</Option>
            </Select>
            <Input.Search enterButton={true}
            onSearch={()=>{
                
            }}
            style={{width:200,marginLeft:50}} placeholder="请输入关键词" />
           </div>
        </div>
    )
}