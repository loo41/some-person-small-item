import React, { Component } from 'react';
import {FontIcon} from 'material-ui';

class load extends Component{
  render () {
    const {animationHeight} = this.props
    return(
     <div style={{
        display: 'flex',
        width: '100%',
        height: `${animationHeight}rem`,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
     }}
     >
       <div><FontIcon className="icon-spinner App-clock" style={{
         color: '#4FDFF2',
         fontSize: '4rem'
       }}/></div>
       <div style={{
          fontSize: '1.8rem',
          fontFamily: 'time'
       }}>加载中...</div>
     </div>
    )
  }
}

export default load