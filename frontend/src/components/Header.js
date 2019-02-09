import React from 'react';
import { Divider,Menu, Icon,Dropdown,message,Drawer,Col, Row } from 'antd';
import { Avatar } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';
import {observer} from 'mobx-react';

import userState from './../mobx/userState'

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
  };
  const DescriptionItem = ({ title, content }) => (
    <div
      style={{
        fontSize: 14,
        lineHeight: '22px',
        marginBottom: 7,
        color: 'rgba(0,0,0,0.65)',
      }}
    >
      <p
        style={{
          marginRight: 8,
          display: 'inline-block',
          color: 'rgba(0,0,0,0.85)',
        }}
      >
        {title}:
      </p>
      {content}
    </div>
  );
class Header extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                current: this.props.current,
                visible: false
              }
    }
    componentDidMount(){
        if(!userState.user.isLogin){
        axios.get("/autoLogin").then((res)=>{
            if(res.data.data.state===0){
                userState.login(res.data.data.data[0])
            }
        })
        }
    }
    logout(){
        axios.get("/logout").then((res)=>{
            if(res.data.data.state===0){
                userState.logout();
                message.info('注销成功');  
            }else{
                message.error('注销失败')  
            }
        })
    }
    render(){
       
        const menu = (
            <Menu>
              <Menu.Item>
                <Icon type="user" />用户:{userState.user.name}
              </Menu.Item>
              <Menu.Item onClick={()=>{
                  this.setState({
                    visible:true
                  })
              }}>
              <Icon type="info-circle"  />我的信息
              </Menu.Item>
              <Menu.Item onClick={()=>{this.logout()}}>
              <Icon type="logout" />注销登录
              </Menu.Item>
            </Menu>
          )
         
        return(
            <div>
            {userState.user.isLogin?<Dropdown overlay={menu} placement="bottomCenter">
            <div style={{float:"left",margin:'7px 50px 0 7px'}}>
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}  icon="user" style={{marginRight:20}} />
            {"欢迎您，用户"+userState.user.name}
            
            </div></Dropdown>:<Link style={{float:"left",lineHeight:'45px',margin:'0 70px 0 30px'}} to='/'>请登录</Link>}
            <Menu
            onClick={(e)=>{
            this.setState({
            current: e.key,
            });}}
            selectedKeys={[this.state.current]}
            mode="horizontal"
             >
            <Menu.Item  >
                <Icon type="home" /><Link style={{display:'inline'}} to="/MainPage">首页</Link>
            </Menu.Item>
            <Menu.Item  >
            <Icon type="exception" /><Link style={{display:'inline'}} to="/CartInfo">车辆信息</Link>
            </Menu.Item>
            <Menu.Item  >
            <Icon type="search" /><Link style={{display:'inline'}} to="/Search">信息查询</Link>
            </Menu.Item>
            <Menu.Item  >
            <Icon type="schedule" /><Link style={{display:'inline'}} to="/Status">我的预约</Link>
            </Menu.Item>
            </Menu>
            <Drawer
          width={350}
          placement="right"
          closable={false}
          onClose={()=>{
              this.setState({
                visible:false
              })
          }}
          visible={this.state.visible}
        >
          <p style={{ ...pStyle, marginBottom: 24 }}>用户信息</p>
          <Row>
            <Col span={30}>
              <DescriptionItem title="用户名" content={userState.user.name} />
            </Col>
          </Row>
          <Row>
            <Col span={30}>
              <DescriptionItem title="电子邮箱" content={userState.user.email} />
            </Col>
          </Row>
          <Row>
            <Col span={30}>
              <DescriptionItem title="电话号码" content={userState.user.phone} />
            </Col>
           
          </Row>
          <Row>
          <Col span={30}>
              <DescriptionItem title="是否管理员" content={userState.user.isAdmin===0?"否":'是'} />
            </Col>
          </Row>

          <Divider />
          <p style={pStyle}>Company</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Position" content="Programmer" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Responsibilities" content="Coding" />
            </Col>
          </Row>
          <Divider />

        </Drawer>
            </div>
        )
    }
}
export default observer(Header)