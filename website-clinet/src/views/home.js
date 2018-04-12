import React, { Component } from 'react';
import { Redirect  } from 'react-router-dom';
import {Img, Body, Content} from '../component/home';

class Home extends Component {
  componentWillMount(){
    console.log(this.props)
  }
  render() {
    return (
      <div>
        <div>
          <div><Body /> </div>
          <div>
            <Content 
              history={this.props.history} /> 
          </div>
          <div><Img /> </div>
        </div>
      </div>
    );
  }
}



export default Home

