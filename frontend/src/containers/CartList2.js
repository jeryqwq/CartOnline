import React from 'react';
import {Card,Avatar,Icon} from 'antd'



const { Meta } = Card;

export default class AllCart extends React.Component{
    state={

    }
    render(){
        return(
            <div style={{width:'85%',margin:'20px auto'}}>
          {
              [1,2,3,4,5,6,7,8].map((item,index)=>(
                <Card key={index}
                hoverable
                style={{ width: 240 ,display:'inline-block',margin:10}}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
              ))
          }
            </div>
        )
    }
}