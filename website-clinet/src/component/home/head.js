import React, { Component } from 'react';
import { Redirect  } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';

class Head extends Component {
  render() {
    return (
      <div id="bigContainer">
       <div style={nveContainer.imgStyle} id="bigPhone">
          <div style={nveContainer.logoTitle}>
            <div style={nveContainer.logoBox}> 
            <div style={nveContainer.logo} className="App-logo">
              <FontIcon className="icon-shocked2" style={{fontSize: '15rem', color: 'white'}}/>
            </div>
            </div>
            <div style={nveContainer.title}>
              <p>天津商业大学阳光网站
                <span style={nveContainer.titleEligsh}>TianJinShangYeDaXue</span>
              </p>
            </div>
          </div>
          <div style={nveContainer.phone}>
            <div>服务热线: <span>2012011-201145</span></div>
          </div>
        </div>

        <div id="smallPhone" style={nveSmallContainer.imgStyle}>
          <div>
            <div style={nveSmallContainer.iconStyle} className="imgStyle"></div>
          </div>
          <div>天津商业大学阳光网站
            <span style={nveSmallContainer.titleEligsh}>TianJinShangYeDaXue</span>
          </div>
          <div style={{fontSize: '1.5rem'}}>
            <span><FontIcon className="icon-phone"/></span>服务热线:  <span><a href="tel:2012011">2012011</a></span>
        </div>
      </div>
      </div>
    );
  }
}

const nveSmallContainer = {
  imgStyle: {
    minHeight: '15rem',
    backgroundColor: 'rgb(0, 188, 212)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    color: 'white',
    paddingTop: '1rem',
    paddingBottom: '1rem'
  },
  iconStyle: {
    height: '5rem',
    width: '5rem',
    borderRadius: '50%',
    backgroundColor: 'white'
  },
  titleEligsh: {
    fontSize: '1.5rem',
    display: 'block'
  }
}

const nveContainer = {
  imgStyle: {
    minHeight: '20rem',
    display: 'flex',
    width: '102.4rem'
  },
  logoTitle: {
    flex: 1,
    display: 'flex'
  },
  logo: {
    minHeight: '15rem',
    width: '15rem',
    textAlign: 'center'
  },
  logoBox: {
    minHeight: '20rem',
    width: '20rem',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    fontSize: '3rem',
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'white'
  },
  titleEligsh: {
    fontSize: '2rem',
    display: 'block',
    color: 'white'
  },
  phone: {
    minHeight: '15rem',
    width: '35rem',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '2rem',
    justifyContent: 'flex-end',
    marginBottom: '2rem',
    color: 'white'
  }
}
export default Head;
