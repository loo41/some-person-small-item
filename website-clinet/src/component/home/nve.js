import React, { Component } from 'react';
import {Tabs, Tab, Avatar} from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import { renderRoutes } from 'react-router-config';
import createHistory from "history/createBrowserHistory";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
const history = createHistory()

class Nve extends Component {
  constructor(props) {
    super(props)
    this.state={
      value: this.props.value
    }
  }
  _router = (Router, value) => {
    this.props.history.push(Router)
    this.setState({value})
  }
  render() {
    return (
      <div>
        <Tabs value={this.state.value}>
          <Tab icon={<FontIcon className="icon-home"/>}
            value="a"
            label="首页" onActive={() => {this._router('/', 'a')}}/>
          <Tab icon={<FontIcon className="icon-office"/>}
            value="b"
            label="公司简介" onActive={() => {this._router('/briefing', 'b')}}/>
          <Tab icon={<FontIcon className="icon-plus"/>}
            value="c"
            label="业务范围" onActive={() => {this._router('/business', 'c')}}/>
          <Tab icon={<FontIcon className="icon-bullhorn"/>}
            value="d"
            label="公示公告" onActive={() => {this._router('/notice/page=1', 'd')}}/>
          <Tab icon={<FontIcon className="icon-phone"/>}
            value="e"
            label="联系我们" onActive={() => {this._router('/contactUs', 'e')}}/>
        </Tabs>
      </div>
    );
  }
}

const getIndex = (state) => {
  return {
    value: state.routerStyleContral.value
  }
}

export default connect(
  getIndex
)(Nve)