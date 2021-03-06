import React from 'react';
import { Carousel,Icon,Anchor,BackTop  } from 'antd';
import Header from './../components/Header'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './../statics/css/index.css';
import axios from 'axios'
import D3Render from './../containers/D3Render'
import CartList from './../containers/CartList'
import CartList2 from './../containers/CartList2'

const { Link } = Anchor;

class MainPage extends React.Component{
    state={
        cartListNew:[],
        cartListHot:[],
        cartListD3:[]
    }
    componentDidMount(){
        const that=this;
       this.getCartInfo('createTime  desc',function(res){
            if(res.data.state===0){
                that.setState({
                    cartListNew:res.data.data
                })
            }
       },8);
       this.getCartInfo('review desc ',function(res){
        if(res.data.state===0){
            that.setState({
                cartListHot:res.data.data
            })
        }
   },8);
   this.getCartInfo('price  desc',function(res){
        if(res.data.state===0){
            that.setState({
                cartListD3:res.data.data
            })
        }
    },6);
    }
    getCartInfo(orderBy,fn,size){
        axios.get("/getProduct",{
            params:{
                pageSize:size,
                pageNum:1,
                where:'1=1',
                orderBy:orderBy,
            }
        }).then((res)=>{
           fn(res);
        })
    }
    render(){
        return(
            <div >
                <Header current="item_0"/>
                <Carousel autoplay>
                <div><img src={require('./../statics/images/cart1.png')}/></div>
                <div><img src={require('./../statics/images/cart1.png')}/></div>
                <div><img src={require('./../statics/images/cart1.png')}/></div>
                <div><img src={require('./../statics/images/cart1.png')}/></div>
                </Carousel>
                <Anchor offsetTop={50} affix style={{width:100,position:"fixed",color:'white',background:'rgba(255,255,255,.8)',borderBottomRightRadius:10,borderTopRightRadius:10}} >
                    <Link href="#part1" title="最新" />
                    <Link href="#part2" title="最热" />
                    <Link href="#part3" title="店主推荐" />
                </Anchor>
                    <h3 id="part1" style={{fontSize:30,textAlign:'center',margin:'20px 0'}}><Icon type="cloud-upload" style={{marginRight:30}} />最近上新</h3>
                    <h3 style={{textAlign:'center',fontSize:20}}>可爱的管理员又上架了以下车辆</h3>
                <CartList cartList={this.state.cartListNew}/>
                    <h3 id="part2" style={{fontSize:30,textAlign:'center',margin:'20px 0'}}><Icon type="fire" style={{marginRight:30,color:'red'}} />热度榜</h3>
                    <h3 style={{textAlign:'center',fontSize:20}}>这里有最多用户关注的车辆排名</h3>
                <CartList2 cartList={this.state.cartListHot}/>
                    <h3 id="part3" style={{fontSize:30,textAlign:'center',margin:'20px 0'}}><Icon type="like" style={{marginRight:30,color:'red'}} />店主推荐</h3>
                    <h3 style={{textAlign:'center',fontSize:20,margin:'20px 0'}}>店主强力推荐款式</h3>
                    <D3Render cartList={this.state.cartListD3}/>
                    <BackTop >
                    <div className="ant-back-top-inner">UP</div>
                    </BackTop>
            </div>
        )
    }
}
export default MainPage