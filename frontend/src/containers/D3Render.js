import React,{useState} from 'react';
import {Collapse } from 'antd'
const Panel = Collapse.Panel;
let timerFlag=true;
let timeout=undefined;
export default function(){
    const [rotateX,setRotateX]=useState(-15);
    const [rotateY,setRotateY]=useState(15);
    const [rotateZ,setRotateZ]=useState('0')
    const [animation,setAnimation]=useState("rotatChange 3s linear infinite")
    return(
        <div style={{background:'#19191e',position:'relative'}}>
           <div className="d3-outer">
           <div className="d3-wrap" style={{transform: "rotateX("+rotateX+"deg) rotateY("+rotateY+"deg) rotateZ("+rotateZ+"deg)",animation: animation}} >
                <span className="top" />
                <span className="right"  />
                <span className="bottom"  />
                <span className="left"  />
                <span className="pre"  />
                <span className="back"  />
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
                <Panel className="panel"  header="经典车型RTY4234-1" key="1">
                <p>This is pane经典车型RTY4234经典车型RTY4234经典车型RTY4234经典车型RTY4234经典车型RTY4234经典车型RTY4234经典车型RTY4234ead</p>
                </Panel>
                <Panel className="panel"  header="经典车型RTY4234-2" key="2">
                <p>This is panel head</p>
                </Panel>
                <Panel className="panel"  header="经典车型RTY4234-3" key="3">
                <p>This is panel head</p>
                </Panel>
                <Panel className="panel"  header="经典车型RTY4234-1" key="4">
                <p>This is panel head</p>
                </Panel>
                <Panel className="panel"  header="经典车型RTY4234-2" key="5">
                <p>This is panel head</p>
                </Panel>
                <Panel className="panel"  header="经典车型RTY4234-3" key="6">
                <p>This is panel head</p>
                </Panel>
            </Collapse>
        </div>
    )
}