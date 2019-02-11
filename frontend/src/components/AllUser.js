import React from 'react'
import { Table, Divider, Popconfirm,Icon,Tag } from 'antd';
import axios from 'axios'


export default class AllUsers extends React.Component{
    state={
        users:[]
    }
    componentDidMount(){
       this.getUsers();
    }
    changeAdmin(id,isAdmin){
        axios.get("/changeAdmin",{
            params:{
                id:id,
                isAdmin:isAdmin
            }
        }).then((res)=>{
            console.log(res);
        })
    }
    getUsers(){
        axios.get('/getUsers').then((res)=>{
            if(res.data.state===0){
                this.setState({
                    users:res.data.data
                })
            }
        })
    }
    delUser(id){
        axios.get("/delUser",{
            params:{
                id:id
            }
        }).then((res)=>{
            console.log(res);
        })
    }
     columns = [{
        title: '用户名',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: '电话',
        dataIndex: 'phone',
        key: 'id',
        sorter: (a, b) => a.age - b.age,
      }, {
        title: '邮箱',
        dataIndex: 'email',
        key: 'address',
      },
      , {
          title: '是否管理员',
          key: 'id',
          dataIndex: 'isAdmin',
          render: isAdmin => (
            <span>
              {isAdmin===1? <Tag color='green' key={isAdmin}>是</Tag>: <Tag color='gray' key={isAdmin}>否</Tag>}
            </span>
          ),
        }, {
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
                text.isAdmin===0?text.isAdmin=1:text.isAdmin=0
              this.changeAdmin(text.id,text.isAdmin);
             setTimeout(()=>{
                this.getUsers();
             },500)
          }} title="确定要修改用户权限吗？" icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
            <a href="#">{text.isAdmin===0?"授权管理员":"撤销管理员"}</a>
          </Popconfirm>
          <Divider type="vertical" />
          <Popconfirm key={text.id} onConfirm={()=>{
              this.delUser(text.id);
              setTimeout(()=>{
                this.getUsers();
             },500)
          }} title="确定删除该用户的信息吗？" icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
            <a href="#">删除该用户</a>
          </Popconfirm>
        </span>
          )
      }
    render(){
        return(
            <Table columns={this.columns} dataSource={this.state.users} />
        )
    }
}