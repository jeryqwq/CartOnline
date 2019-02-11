import React, { useState } from 'react';
import "./../statics/css/login.css";
import { message } from 'antd';
import axios from 'axios';
import userState from './../mobx/userState'
import { Redirect ,Link} from 'react-router-dom';

let mouseMoveFlag=false;
export default function() {
    const [img1Left,setImg1Left]=useState(0);
    const [curActive,setCurActive]=useState(true);
    const [silderLeft,setSilderLeft]=useState(0);
    const [innerTip,setInnerTip]=useState('向右滑动通过验证');
    const [sliderBgColor,setSliderBgColor]=useState("white")
    const [isSlidered,setIsSlidered]=useState(false);
    const [name,setName]=useState('');
    const [pwd,setPwd]=useState('');
    const [repwd,setRePwd]=useState('');
    const [phone,setPhone]=useState('');
    const [email,setEmail]=useState('');
    const [isLogin,setIsLogin]=useState(false)
    function checkValisEmpty(...args){
        for(let i in args){
            if(args[i]===''){
                return true;
            }
        }
        return false;
    }
    function register(){
        if(checkValisEmpty(name,pwd,repwd,phone,email)){
            message.error("请完整输入注册信息")
            return;
        } 
        if(pwd===repwd){
            axios.get('/register',{
                params:{
                    name:name,
                    pwd:pwd,
                    repwd:repwd,
                    phone:phone,
                    email:email
                }
            }).then((res)=>{
                if(res){
                    message.info('注册成功，请登录');
                    setCurActive(true);
                }
            })
        }else{
            message.error("两次输入密码不一致")
        }
    }
    function login (){
      axios.get('/login', {
        params: {
          name: name,
          pwd:pwd
        }
      }).then((res)=>{
       if(res.data.data.state===0){
         message.info("登录成功！");
         setImg1Left(-1200);
        userState.login(res.data.data.data[0]);
        setTimeout(()=>{
            setIsLogin(true);
        },1000)
       }else{
         message.error("登录失败，请检查信息后重试")
         setImg1Left(0);
       }
      })
    }
    function MoveCar(event){
      setImg1Left(-(Math.random()*100));
    }
    function MoveCarLeft(input){
      if(input.target.value.length<10){
        setImg1Left((-50)-(input.target.value.length*10));
      }
    }
    function tabBar(val){
      setCurActive(val);
    }
    function sliderMove(event){
      if(mouseMoveFlag){
        setSilderLeft(event.screenX-180);
        setSliderBgColor('gray');
        if(event.screenX-180>=270){
          setSilderLeft(270);
          setInnerTip('验证通过');
          setIsSlidered(true);
          setSliderBgColor('white');
          message.info('验证成功！请登录');
          mouseMoveFlag=false;
        }else if(event.screenX-180<0){
          setSilderLeft(0);
          mouseMoveFlag=false;
        }
      }else{
        setSilderLeft(0);
        setSliderBgColor('white');
        mouseMoveFlag=false;
      }
    }

    return (
      <div style={{width:'100%',height:'100%',background:'black'}}>
        <div onMouseMove={(event)=>{MoveCar(event)}} style={{height:'50%',overflow:'hidden'}}>
          <img style={{position:'relative',left:img1Left+'px',transition:'all .8s'}}  src={require('./../statics/images/bg.png')}/>
        </div>
        {
        isLogin?<Redirect push to="/MainPage"/>:undefined
        }
        <div style={{height:'50%',overflow:'hidden'}}>
          <img style={{position:'relative',left:img1Left+'px',transition:'all .8s'}}  src={require('./../statics/images/bg2.png')}/>
        </div>
        <div style={{position:'fixed',top:50,left:50,width:'30%',height:'60%',backgroundColor:'rgba(255,255,255,0.1)',boxShadow:'grey 0px 0px 16px'}}>
            <img src={require('./../statics/images/bg.jpg')} style={{width:'100%',height:'100%',position:"absolute"}}/>
            <div  style={{width:'100%',height:'100%',position:"absolute",background:'rgba(40,57,101,.9)'}}>
                <ul style={{margin:'50px 70px 0 70px'}} className="btn-wrap">
                  <li className={curActive?'active':''} onClick={()=>{tabBar(true)}}>登录</li>
                  <li className={(!curActive)?'active':'' } onClick={()=>{tabBar(false)}}>注册</li>
                </ul>
                {curActive?<div style={{textAlign:'center',transition:'all .8s'}}>
                  <label>UserName<br/>
                  <input  onBlur={()=>{setImg1Left(0)}}  onChange={(event)=>{MoveCarLeft(event);setName(event.target.value)}}  type="text" placeholder="请输入用户名"/>
                  </label>
                  <br/>
                  <label>PassWord<br/>
                  <input  onBlur={()=>{setImg1Left(0)}}  onChange={(event)=>{MoveCarLeft(event);setPwd(event.target.value)}}   type="password" placeholder="请输入密码"/>
                  </label>
                  <div  onMouseMove={(event)=>{sliderMove(event)}} className="slider-wrap" style={{background:sliderBgColor}} >
                  <div  onMouseLeave={()=>{mouseMoveFlag=false}} onMouseDown={()=>{mouseMoveFlag=true;}} onMouseUp={()=>{mouseMoveFlag=false;}} className='slider-block' style={{left:silderLeft+'px'}}>→</div>
                  {innerTip}
                  </div>
                  <br/>
                  <input onClick={()=>{login()}} type="button" value="登陆"   disabled={!isSlidered?'disabled':undefined} style={{background:!isSlidered?'gray':undefined}}/>
                  <hr color='gray' style={{width:'calc( 100% - 140px)',margin:'52px auto 0 auto'}}/>
                  <Link to="/MainPage" style={{color:'rgb(17, 97, 238)',float:'left',marginLeft:70}}>游客登录</Link>
                </div>:<div style={{textAlign:'center',transition:'all .8s'}}>
                  <label>UserName<br/>
                  <input  onBlur={()=>{setImg1Left(0)}}  onChange={(event)=>{MoveCarLeft(event);setName(event.target.value)}}  type="text" placeholder="请输入用户名"/>
                  </label>
                  <br/>
                  <label>PassWord<br/>
                  <input onBlur={()=>{setImg1Left(0)}}  onChange={(event)=>{MoveCarLeft(event);setPwd(event.target.value)}}   type="password" placeholder="请输入密码"/>
                  </label>
                  <br/>
                  <label>RePassWord<br/>
                  <input onBlur={()=>{setImg1Left(0)}}  onChange={(event)=>{MoveCarLeft(event);setRePwd(event.target.value)}}   type="password" placeholder="请再次输入密码"/>
                  </label>
                  <br/>
                  <label>Phone<br/>
                  <input onBlur={()=>{setImg1Left(0)}}  onChange={(event)=>{MoveCarLeft(event);setPhone(event.target.value)}}   type="text" placeholder="请输入电话"/>
                  </label>
                  <br/>
                  <label>Email<br/>
                  <input onBlur={()=>{setImg1Left(0)}}  onChange={(event)=>{MoveCarLeft(event);setEmail(event.target.value)}}   type="email" placeholder="请输入邮箱"/>
                  </label>
                  <br/>
                  <input onClick={()=>{register()}} type="button" value="注册" />
                </div>}
            </div>
        </div>
      </div>
    );
  
}


