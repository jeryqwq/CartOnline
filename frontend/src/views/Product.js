import React from 'react';
import Header from './../components/Header'
import "./../statics/css/product.css"

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
            subImgLeft:0
        }
    }
    componentDidMount(){
        this.setState({
            leftValue:this.refs.modal.offsetParent.offsetParent.offsetParent.offsetLeft,
            topValue:this.refs.modal.offsetParent.offsetParent.offsetParent.offsetTop
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
                        <img src={this.state.curImg} 
                        />
                    </div>
                        <div className="subImg">
                            {
                                [1,2,3,4,5,6].map((item,index)=>{
                                    return<img key={index} onClick={()=>{
                                        this.setState({curIndex:index})
                                    }} className={this.state.curIndex===index?"active":''} src={require("./../statics/images/bg.jpg")}
                                    style={{width:100/6+"%",height:80}}
                                    />
                                })
                            }
                        </div>
                        <div className="to-review"  style={{display:this.state.isShow?"block":'none'}}>
                        <img src={this.state.curImg} style={{position:'relative',left:-this.state.left +"px ",top:-this.state.top+ "px"}}/>
                        </div>
                   </div>
                   <div className="part-right">

                   </div>
                </div>
            </div>
        )
    }
}