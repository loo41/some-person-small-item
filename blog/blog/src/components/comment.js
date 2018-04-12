import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Toggle,
  Card,
  CardText,
  TextField,
  RaisedButton
} from 'material-ui';


class comment extends Component{
  constructor(props){
    super(props)
    this.state={
      expanded: this.props.closeOpen
    }
  }
  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };
  render () {
    const {
      control,
      bottomStyle
    } = this.props
    return (
      <div>
        {control?<Toggle
          toggled={this.state.expanded}
          onToggle={this.handleToggle}
          labelPosition="right"
          label="评论"
        />: null}
        <Card expanded={this.state.expanded}>
          <CardText 
            expandable={true}
            children={ <div>
                          <TextField
                           hintText="请输入内容"
                          />
                          <div>
                           <RaisedButton label="提交" primary={true} style={bottomStyle}/>
                           <RaisedButton label="清空" primary={true} style={bottomStyle}/>
                          </div>
                        </div>}
          />
        </Card>
      </div>
    )
  }
}

comment.PropTypes = {
  control: PropTypes.bool,
  closeOpen: PropTypes.bool,
  bottomStyle: PropTypes.object
}

export default comment