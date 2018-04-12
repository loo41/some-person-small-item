import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import '../static/css/style.css';
import '../static/css/index.css';
import "react-image-gallery/styles/css/image-gallery.css";
import {FloatingActionButton, FontIcon} from 'material-ui';
import {Head, Nve,} from '../component/home'

class Root extends Component {
  constructor(props) {
    super(props)
    this.state = {
      styles: [{ width: '102.4rem', margin: '0 auto'}, { width: '100%'}],
      rootStyle: { width: '102.4rem', margin: '0 auto'},
      index: 0
    }
  }
  _changeScreen = () => {
    if (this.state.index === 0) {
      this.setState({
        rootStyle: this.state.styles[1],
        index: 1
      })
      return
    }
    this.setState({
      rootStyle: this.state.styles[0],
      index: 0
    })
  }
  render() {
    return (
      <div style={this.state.rootStyle} className="root">
        <div>
          <Head />
          <div style={{
            position: 'fixed',
            top: '3rem',
            right: '10%'
          }} className="bigWeb">
          <FloatingActionButton onClick={this._changeScreen}>
            <FontIcon className="icon-enlarge2" style={{color: 'white'}}/>
          </FloatingActionButton>
          </div>
        </div>
        <div><Nve history={this.props.history}/> </div>
          {renderRoutes(this.props.route.routes)}
        <div style={rootContainer.footerStyle}>
          <span style={{
            textAlign: 'center',
            padding: '1rem'
          }}>我们来自天津身上月大学我们来自天津身上月大学我们来自天津身上月大学我们来自天津身上月大学</span>
        </div>
      </div>
    );
  }
}

const rootContainer = {
  footerStyle: {
    height: '10rem', 
    backgroundColor: 'rgb(0, 188, 212)', 
    marginTop: '5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '1.2rem'
  }
}

export default Root;