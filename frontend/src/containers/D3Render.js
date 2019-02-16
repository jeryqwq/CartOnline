import React,{useState} from 'react';
import {Collapse } from 'antd';
import {Link} from 'react-router-dom'
const Panel = Collapse.Panel;
let timerFlag=true;
let timeout=undefined;
export default function(props){
    const [rotateX,setRotateX]=useState(-15);
    const [rotateY,setRotateY]=useState(15);
    const [rotateZ,setRotateZ]=useState('0')
    const [animation,setAnimation]=useState("rotatChange 3s linear infinite")
    return(
        <div style={{background:'#19191e',position:'relative'}}>
           <div className="d3-outer">
           <div className="d3-wrap" style={{transform: "rotateX("+rotateX+"deg) rotateY("+rotateY+"deg) rotateZ("+rotateZ+"deg)",animation: animation}} >
                {
                    props.cartList.map((item,index)=>
                    <Link key={index} to={"/Product/"+item.id}><span className={"item"+index} style={{backgroundImage: "url("+item.img+")"}} />
                    </Link>
                    )
                  
                }
            </div>
           </div>
            <Collapse bordered={false} onChange={(key)=>{
               setAnimation("none");
               if(timeout!==undefined){
                   clearTimeout(timeout);
               }
                if(key==='1'){
                    setRotateX(-75);
                    setRotateY(-29);
                    setRotateZ(0)

                }
                if(key==='2'){
                    setRotateX(-12);
                    setRotateY(-80);
                    setRotateZ(0)

                }
                if(key==='3'){
                    setRotateX(-80);
                    setRotateY(-16);
                    setRotateZ(0)
                }
                if(key==='4'){
                    setRotateX(-15);
                    setRotateY(-106);
                    setRotateZ(0)
                }
                if(key==='5'){
                    setRotateX(-15);
                    setRotateY(15);
                    setRotateZ(0)
                }
                if(key==='6'){
                    setRotateX(3);
                    setRotateY(166);
                    setRotateZ(30)
                }
             
                timeout=setTimeout(()=>{
                    setAnimation("rotatChange 3s linear infinite");
                   },5000)
              
            }}  className="right-part3" accordion>
                {
                    props.cartList.map((item,index)=>
                    <Panel key={index} className="panel"  header={item.title} >
                <p>{item.desc}</p>
                </Panel>
                )}
               
            </Collapse>
        </div>
    )
}