import React, { Component } from 'react';
import {
  CardText, 
} from 'material-ui';


class time extends Component {
  constructor(props){
    super(props)
    this.state={
      nowTime: ''
    }
  }
  getChangeTime = () => {
    const time = new Date()
    const nowYear = time.getFullYear()
    const nowMonth = time.getMonth()
    const nowDay = time.getDate()
    const nowHours = time.getHours()
    const nowMinutes = time.getMinutes()
    const nowMillisecond = time.getSeconds()
    const times = `${nowYear}年 ${nowMonth+1}月 ${nowDay}日 
    ${nowHours}点 ${nowMinutes}分 ${nowMillisecond}秒`
    this.setState({
      nowTime: times 
    })
  }
  componentDidMount() {
    setInterval(this.getChangeTime, 1000)
  }
  render() {
    const {timeStyle} = this.props
    return (
      <div>
        <CardText
          children={<div
            style={timeStyle}
          >
          {this.state.nowTime}
          </div>}
        />
      </div>
    );
  }
}

export default time;