import {Layout, Menu, Icon,} from 'antd';
import React from 'react';
import AddCart from './../components/AddCart'
import HeaderTitle from './../components/Header'
import AllCart from '../components/AllCart'
import Calendar from './../components/Calendar'
import User from './../components/AllUser'
const {  Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
 export default class SiderDemo extends React.Component {
    state = {
      collapsed: false,
      key:'4'
    };
    onCollapse = (collapsed) => {
      console.log(collapsed);
      this.setState({ collapsed });
    }
  
render() {
    return (
    <div>
        <HeaderTitle current="item_4" />
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['4']} mode="inline"
            onClick={(e)=>{
               this.setState({
                   key:e.key
               })
            }}
            >
            <SubMenu
                key="sub1"
                title={<span><Icon type="database"  /><span>车辆信息管理</span></span>}
              >
                <Menu.Item key="1"><Icon type="plus" /><span>新增车辆</span></Menu.Item>
                <Menu.Item key="2"><Icon type="hdd" /><span>车辆操作</span></Menu.Item>
              </SubMenu>
              <Menu.Item key="4">
              <Icon type="schedule" />
                <span>所有预约</span>
              </Menu.Item>
              <Menu.Item key="5">
              <Icon type="solution" />
                <span>用户管理</span>
              </Menu.Item>
              <SubMenu
                key="sub2"
                title={<span><Icon type="project" /><span>车型管理</span></span>}
              >
                <Menu.Item key="6"><Icon type="user" /><span>车型列表</span></Menu.Item>
                <Menu.Item key="7"><Icon type="user" /><span>新增车型</span></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: '0 16px' }}>
                <div style={{background:'white',minHeight:'90vh'}}>
                {this.state.key==="1"?<AddCart/>:undefined}
                {this.state.key==="2"?<AllCart/>:undefined}
                {this.state.key==="4"?<Calendar/>:undefined}
                {this.state.key==="5"?<User/>:undefined}
                {this.state.key==="6"?6:undefined}
                {this.state.key==="7"?7:undefined}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              LookCart看车网 ©2018 Created by LineWell UED
            </Footer>
          </Layout>
        </Layout>
        </div>
      );
    }
  }
  