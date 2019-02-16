import React from 'react';
import{Table,message,Popconfirm ,Icon} from 'antd'
import Axios from 'axios';
export default class CartType extends React.Component{
    state={
        typeList:[]
    }
    componentDidMount(){
        this.getTypeList();
    }
    getTypeList(){
        Axios.get("/getCategory").then((res)=>{
            if(res.data.state===0){
                this.setState({
                    typeList:res.data.data
                })
            }
        })
    }
    delCate(id){
        Axios.get("/delCategory",{
            params:{
                id:id
            }
        }).then((res)=>{
            if(res.data.state===0){
               message.info("删除成功!")
            }
        })
    }

    columns = [{
        title: '车型ID',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '车型名称',
        dataIndex: 'cateName',
        key: 'cateName',
      }, {
        title: '车型描述',
        dataIndex: 'cateDesc',
        key: 'cateDesc',
      },
      {
        title: '操作',
        key: 'id',
        render: (text, record) => (
            this.actions(text)
        ),
      }];
      actions(text){
          return(
            <span>
                  <Popconfirm key={text.id} onConfirm={()=>{
              this.delCate(text.id);
              setTimeout(()=>{
                this.getTypeList();
             },500)
          }} title="确定删除该条分类?" icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
            <a href="#">删除该分类</a>
            </Popconfirm>
            </span>
          )
      }
    render(){
        return(
            <div>
                <Table columns={this.columns} dataSource={this.state.typeList} />
                
            </div>
        )
    }
}