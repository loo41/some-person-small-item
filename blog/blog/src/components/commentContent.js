import React, { Component } from 'react';
import {blogDatas} from '../data';
import {
  Toggle,
  ListItem,
  Avatar,
  FontIcon
} from 'material-ui';

class commentContent extends Component{
  constructor(props){
    super(props)
    this.state={
      expanded: this.props.closeOpen,
      comment: blogDatas.comment
    }
  }
  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };
  render () {
    const {
      control,
    } = this.props
    return (
        <div>
        {control?<Toggle
          toggled={this.state.expanded}
          onToggle={this.handleToggle}
          labelPosition="right"
          label="内容"
        />: null}
        {this.state.expanded?<div style={{minHeight: '10rem'}}>
          {this.state.comment.map((item, i) => {
            return (
            <div key={i}>
            <ListItem
              primaryText={item.content}
              leftAvatar={<Avatar src={item.url} />}
              rightIcon={<FontIcon className="" />}
            />
            </div>
            )
          })}
        </div>: null}
      </div>
    )
  }
}

export default commentContent