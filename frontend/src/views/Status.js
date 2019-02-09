import React from 'react';
import { Calendar,Badge } from 'antd';
import Header from './../components/Header'
export default function(){
    function getListData(value) {
        let listData;
        switch (value.date()) {
          case 8:
            listData = [
              { type: 'warning', content: '当天有预约' },
              { type: 'success', content: '距离现在还剩X 天' },
            ]; break;
          case 15:
            listData = [
              { type: 'warning', content: '当天有预约' },
              { type: 'success', content: '点击查看车辆信息' },
              { type: 'error', content: '距离现在还剩X 天' }
            ]; break;
          default:
        }
        return listData || [];
      }
      
      function dateCellRender(value) {
        const listData = getListData(value);
        return (
          <ul className="events">
            {
              listData.map(item => (
                <li key={item.content}>
                  <Badge status={item.type} text={item.content} />
                </li>
              ))
            }
          </ul>
        );
      }
      
      function getMonthData(value) {
        if (value.month() === 8) {
          return 1394;
        }
      }
      
      function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
          <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
          </div>
        ) : null;
      }
      
    return (
        
      <div>
            <Header current="item_3"/>
            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender}/>
      </div>
    )
}