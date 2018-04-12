import React, { Component } from 'react';
import {
  Card, CardActions, 
  CardHeader, CardMedia, 
  CardTitle, CardText,
  Drawer, AppBar
} from 'material-ui';
import {
  NavLink,
} from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import '../../static/css/App.css';
import '../../static/css/style.css';
import DrawerExpend from '../expend';
import {AriticleList, lableData} from '../../data'
import imgs from '../../static/images/5.jpg'

class Header extends Component {
  constructor(props){
    super(props)
    this.state={
      backgroundImg: '',
      information: '每个人都是梦想家，可是梦醒了，只剩下想家了',
      open: false,
      fristLabel: Object.keys(AriticleList)[0],
      fristAritic: lableData.article[0]
    }
  }
  _openData = () => {
    this.setState({open: !this.state.open})
  }
  render() {
    const icon = (className) =>  {
      return <span><FontIcon
        className={className}
        style={iconStyle}
      /></span>
    }
    return (
      <div>
        <Card>
        <CardMedia
          overlay={
          <CardHeader
            title="LoveLife"
            subtitle="生活不应该苟且于当下"
            avatar={imgs}
          />
          }
        >
          <img src={imgs} style={{
            maxHeight: '30rem'
          }} alt="me"/>
        </CardMedia>
        <CardTitle
          style={{
            fontFamily: 'title'
          }}
          title="写给自己的一句话" 
          subtitle="loveLife" 
        />
        <CardText>
          {this.state.information}
        </CardText>
        <CardActions
          style={{textAlign: 'center'}}
        >
          <NavLink to={{
            pathname: '/home',
            search: 'page=1'
          }}>
          <FlatButton 
            label="主页"
            children={icon('icon-home')}/>
          </NavLink>
          <NavLink to={{
            pathname: '/blog',
            search: `tab=recommendation&articleID=${this.state.fristAritic.id}`
          }}>
          <FlatButton 
            label="博客" 
            children={icon('icon-diary')}/>
          </NavLink>
          <NavLink to={{
            pathname: '/label',
            search: `tab=${this.state.fristLabel}&page=1`
          }}>
          <FlatButton 
            label="标签" 
            children={icon('icon-price-tags')}/>
          </NavLink>
          <NavLink to="/like">
          <FlatButton 
            label="爱好" 
            children={icon('icon-heart')}/>
          </NavLink>
          <NavLink to={{
            pathname: '/leaveMessage',
            search: 'page=1'
          }}>
          <FlatButton 
            label="留言" 
            children={icon('icon-pencil-square')}/>
          </NavLink>
          <FlatButton 
            label="更多" 
            onClick={this._openData}
            children={icon('icon-enlarge2')}/>
        </CardActions>
      </Card>
      <div>
        <Drawer 
          style={{width: '50rem'}} 
          openSecondary={true} 
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})} 
          docked={false}>
          <DrawerExpend></ DrawerExpend>
        </Drawer>
      </div>
      <div>
      </div>
      </div>
    );
  }
}

const iconStyle={
  fontSize: '1.6rem',
}

export default Header;
