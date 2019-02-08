import React ,{useState,useReducer}from 'react';
import {observer} from 'mobx-react';
import userState from './../mobx/userState'
class MainPage extends React.Component{
    
    constructor(props){
        super(props); 
    }
    render(){
        return(
            <div>{}
            <button onClick={()=>{userState.login({a:123})}}>++</button>
            </div>
        )
    }
}
export default observer(MainPage)