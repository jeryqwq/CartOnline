import React from 'react';
import { Icon,Calendar,Badge } from 'antd';
import moment from 'moment'
import {Link} from 'react-router-dom'
export default class Calendar1 extends React.Component{
   constructor(props){
      super(props)
   }
   
     
     
    render(){
      return (
        
        <div>
              <Calendar dateCellRender={(val)=>{
                let list;
                  const dateList=this.props.dateList
                  for (const key in dateList) {
                    if (dateList.hasOwnProperty(key)) {
                      const element = dateList[key];
                     if(moment(element.Time).date()===val.date()){
                       if(moment(element.Time).month()<val.month()){
                        list=<Link to={"/Product/"+element.cartId}><Icon type="frown" /><Badge status="error" text={"该预约已过期"} /></Link>
                       }else if(moment(element.Time).month()==val.month()){                
                            list=<Link to={"/Product/"+element.cartId}><Icon type="bell" /><Badge status="success" text="今日有预约" /></Link>
                        }else{
                          list=<Link to={"/Product/"+element.cartId}><Icon type="solution" /><Badge status="warning" text={val.month()+"月有预约"} /></Link>
                        }
                      return list;
                      
                     }
                    }
                  }
              }}/>
        </div>
      )
    }
}