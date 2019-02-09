import React from 'react';
import Header from './../components/Header'
import CartList from './../containers/CartList'
import {Pagination,Radio ,Select} from 'antd'

const Option = Select.Option;
const RadioGroup = Radio.Group;
export default class CartInfo extends React.Component{
    state={
        value: 1,
    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      }
   render(){

    return(
        <div>
            <Header current="item_1"/>
            <div style={{height:50,margin:"25px 0  0 50%"}}>
            分类查看:&nbsp;&nbsp;&nbsp;<Select labelInValue defaultValue={{ key: 'global' }} style={{ width: 120 }} >
                <Option value="global">分类</Option>
                <Option value="jack">分类1</Option>
                <Option value="lucy">分类2</Option>
                <Option value="lucy">分类3</Option>
            </Select>
            <RadioGroup style={{float:"right"}}
            onChange={this.onChange} value={this.state.value}>
            排序方式:&nbsp;&nbsp;
                <Radio value={1}>上架时间</Radio>
                <Radio value={2}>浏览量</Radio>
                <Radio value={3}>价格</Radio>
            </RadioGroup>
            </div>
            <CartList/>
            <Pagination style={{textAlign:'center',margin:"50px 0 30px 0"}} 
            defaultCurrent={1} total={50} />
        </div>
    )
   }
}