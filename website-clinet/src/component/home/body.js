import React, { Component } from 'react';
import { Redirect  } from 'react-router-dom';

class Body extends Component {
  render() {
    const route = this.props.route
    return (
      <div>
      <div style={{paddingTop: '1rem', paddingBottom: '1rem'}} >
        <img src="//www.baidu.com/img/bd_logo1.png" style={{height: '40rem', width: '100%'}} id="briefImg"/>
      </div>
      </div>
    );
  }
}

export default Body;