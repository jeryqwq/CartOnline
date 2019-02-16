import React from 'react';
import Header from './../components/Header'
import {Icon,Button,DatePicker,Modal,InputNumber,message } from 'antd'
import "./../statics/css/product.css"
import Axios from 'axios';
import moment from 'moment';
import userState from './../mobx/userState'

let left,top;

export default class Product extends React.Component{
    constructor(props){
        super(props);
        this.state={
            left:0,
            top:0,
            curImg:"0.9939289023637934.jpg",
            leftValue:0,
            topValue:0,
            isShow:false,
            curIndex:0,
            subImgLeft:0,
            cart:{subImgs:[],
            richText:''},
            time:"",
            modalVisible:false,
            count:1
        }
    }
    componentDidMount(){
        this.setState({
            leftValue:this.refs.modal.offsetParent.offsetParent.offsetParent.offsetLeft,
            topValue:this.refs.modal.offsetParent.offsetParent.offsetParent.offsetTop
        });
        this.getCartInfo();
        this.addReview()
    }
    addReview(){
        Axios.get("/addReview",{
            params:{
                id:this.props.match.params.id
            }
        }).then((res)=>{

        })
    }
    getCartInfo(){
        Axios.get("/getProductById",{
            params:{
                id:this.props.match.params.id
            }
        }).then((res)=>{
           if(res.data.state==0){
               const subImgs=res.data.data.subImgs.split(',');
               res.data.data.subImgs=subImgs
               this.setState({
                 cart:res.data.data,
                 curImg:res.data.data.img
               })
           }
        })
    }
    addState(){
        Axios.get("/addStatus",{
            params:{
                cartId:this.props.match.params.id,
                Time:this.state.time,
                uId:userState.user.id,
                count:this.state.count
            }
        }).then((res)=>{
            if(res.data.state==0){
                message.info("预定成功")
            }
        })
    }
    modalMove(event){
        const that=this;
        const pageX=event.pageX;
        const pageY=event.pageY;
            left=pageX-that.state.leftValue-100;
            top=pageY-that.state.topValue-100
           if(left<=0||left>=200||top>=200||top<=0){
               return;
           }else{
            that.setState({
                left:left,
                top:top
            }) 
           }

    }
    render(){
        return(
            <div>
                <Header current="item_0"/>
                <div className="img-wrap">
                   <div className="part-left">
                    <div className="bigImg-wrap">
                        <div ref="modal"
                         onMouseOut={()=>{this.setState({isShow:false})}}
                        onMouseEnter={()=>{this.setState({isShow:true})}}
                        onMouseMove={(event)=>{
                           this.modalMove(event);
                        }} className="modal"
                        style={{left:this.state.left,top:this.state.top}}
                        ></div>
                        <img src={"http://localhost:5000/"+this.state.curImg} 
                        />
                    </div>
                        <div className="subImg">
                            {
                                this.state.cart.subImgs.map((item,index)=>{
                                    if(item!==""){
                                        return<img key={index} onClick={()=>{
                                            this.setState({
                                                curIndex:index,
                                                curImg:item
                                            })
                                        }} className={this.state.curIndex===index?"active":''} src={"http://localhost:5000/"+item}
                                        style={{width:100/6+"%",height:80}}
                                        />
                                    }
                                   
                                })
                            }
                        </div>
                        <div className="to-review"  style={{display:this.state.isShow?"block":'none'}}>
                        <img src={"http://localhost:5000/"+this.state.curImg}  style={{position:'relative',left:-this.state.left +"px ",top:-this.state.top+ "px"}}/>
                        </div>
                   </div>
                   <div className="part-right">
                           <p className="cartTitle">{this.state.cart.title}<span className="mark">{this.state.cart.status===1?"预定中":"已下架"}</span></p>
                           <p >品牌:<span className="value">{this.state.cart.pingpai}</span></p>
                           <p >商品说明:<span className="value">{this.state.cart.desc}</span></p>
                            <p className="price">价格:<span className="num">{this.state.cart.price/10000}</span> 万元<span className="subNum" >{this.state.cart.price}</span></p>
                            <p className="">上架日期:<span className="value">{this.state.cart.createTime}</span></p>
                            <p><Icon type="eye" /><span style={{marginLeft:20}}>{this.state.cart.review}</span></p>
                            <Button 
                            onClick={()=>{
                                this.setState({
                                    modalVisible:true
                                })
                            }}
                            style={{marginTop:60,zIndex:2}} type="primary" shape="round" icon="file-add" size='large'>预定</Button>
                          
                            <Modal
                            title="请选择预定时间"
                            style={{ top: 200 }}
                            visible={this.state.modalVisible}
                            onOk={() => {
                                this.setState({modalVisible:false})
                                this.addState();
                            }}
                            onCancel={() => this.setState({modalVisible:false})}
                            >
                            <DatePicker 
                                onChange={(val)=>{
                                    this.setState({
                                        time:val.format("YYYY-MM-DD")
                                    })
                                }}
                                disabledDate={(current)=>{
                                    if (current.date()>=moment().date()) {
                                        return false;
                                        }else{
                                            return true;
                                        }
                                }}
                                 />
                                   <InputNumber min={1} max={10} defaultValue={1} onChange={(val)=>{
                                       this.setState({count:val})
                                   }} />,

                                </Modal>
                            
                   </div>
                   <div className="richText" dangerouslySetInnerHTML={{__html:this.state.cart.richText}}/>
                </div>
            </div>
        )
    }
}