import React from 'react';
import Header from './../components/Header'
import Calendar from './../components/Calendar'
import Axios from 'axios';
export default class Status extends React.Component{ 
  state={
    dateList:[]
  }
  componentDidMount(){
    this.getStatus()
  }
  getStatus(){
    Axios.get("/getStatus").then((res)=>{
     if(res.data.state===0){
       this.setState({
         dateList:res.data.data
       })
     }
    })
  }
    render(){
      return (
        
      <div>
            <Header current="item_3"/>

            <Calendar dateList={this.state.dateList}/>
      </div>
    )
    }
}