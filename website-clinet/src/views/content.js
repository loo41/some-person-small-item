import React, { Component } from 'react';
import {FontIcon, Snackbar, CircularProgress} from 'material-ui';
import {NORTICE} from '../api';


class ContactUs extends Component {
  constructor(props) {
    super(props)
    this.state={
      content: false,
      open: false
    }
  }
  componentWillMount() {
    const id = this.props.location.search.match(/=(.*)/)[1]
    this._content(id)
  }

  _content = async(id) => {
    try{
      const content = await NORTICE.getContent({id})
      const data = await content.data.data[0].htmlString
      this.setState({content: data})
    } catch(e) {
      console.log(e)
      this.setState({open: true})
    }finally{
      this.ontClick = false
    }
  }

  _creatHtml = () => {
    return {__html: this.state.content}
  }

  render() {
    return (
      <div>
        <div style={{
          minHeight: '50rem',
          width: '102.4rem',
          margin: '0 auto',
          marginTop: '1rem'
        }} className="briefingContentStyle">
          <div style={{
            height: '3rem',
            borderBottom: '2px solid red'
          }}><FontIcon className="icon-forward3"   onClick={() => {this.props.history.goBack()}}/></div>
            {this.state.content === false? <div style={{
              display: 'flex',
              minHeight: '20rem',
              justifyContent: 'center',
              alignItems: 'center'}}>
              <CircularProgress size={80} thickness={5} color={'black'}/>
              </div>
             :<div class="ql-container ql-snow">
                <div class="ql-editor">
                <div dangerouslySetInnerHTML={this._creatHtml()}></div>
              </div></div>}
        </div>
        <Snackbar
          open={this.state.open}
          message={'错误'}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

export default ContactUs;