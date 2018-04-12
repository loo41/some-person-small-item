import React, { Component } from 'react';
import {
  Dialog, FlatButton,
  List,
  RaisedButton,
  TextField,
  Snackbar
} from 'material-ui';
import {Link,} from 'react-router-dom';
import {connect} from 'react-redux'
import {LEAVEMESSAGE} from '../../api';
import Load from '../../components/loading'
import {leaveMessages, leaveLengths} from '../../data'

class leaveMessage extends Component {
  constructor(props){
    super(props)
    this.state={
      open: false,
      leaveContent: true,
      message: '',
      page: 1,
      isSubmit: true,
      inputLeave: '',
      openClose: false
    }
    this.ontclick = false
    this.notRepeat = false
  }
  
  async componentWillMount(){
    if (this.props.messages) {
      this.setState({
        leaveContent: this.props.messages
      })
      return
    }
    if (this.ontclick) return
    this.ontclick = true
    try{
      const content = await LEAVEMESSAGE.list({page: 1})
      const list = content.data.data
      this.setState({
        leaveContent: list
      })
      this.props.sendLeave(list)
    }catch(e) {
      this.setState({
        leaveContent: leaveMessages
      })
      this.props.sendLeave(leaveMessages)
      console.log(e)
    }finally {
      this.ontclick = false
    }

  }
  _dialogArise = () => {
    this.setState({open: true})
  }
  _handleClose = () => {
    this.setState({open: false})
  }
  _submit = async () => {
    if (this.notRepeat) return
    this.notRepeat = true
    try{
      const submit = await LEAVEMESSAGE.leaveMessage({
        content: this.state.inputLeave
      })
      const gobackMessage = submit.data
      if(gobackMessage.code !== 200) throw '后端返前端错误'
      this.setState({
        openClose: true,
        leaveContent: gobackMessage.data,
        message: '提交成功'
      })
      this.props.sendLeave(gobackMessage.data)
    }catch(e){
      this.setState({
        openClose: true,
        message: '提交出错'
      })
      console.log(e)
    }finally{
      this.notRepeat = false
    }
  }

  _handleRequestClose = () => {
    this.setState({
      openClose: false,
    })
  }
  
  _changPageContent = async() => {

    try{
      if (this.state.page >= Math.ceil(leaveLengths.account/5) || this.notRepeat) {
        this.notRepeat = true
        this.setState({
          openClose: true,
          message: '没有更多了'
        })
        return
      }
      const data = await LEAVEMESSAGE.list({page: this.state.page + 1 })
      const content = data.json()
      this.props.history.push(`/leaveMessage?page=${this.state.page + 1}`)
      this.setState({
        page: this.state.page+1,
        leaveContent: content
      })
    }catch(e) {
      console.log(e)
    }finally{
      this.notRepeat = false
    }
  }
  render () {
    const data = this.state.leaveContent
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this._handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={this.state.isSubmit}
        onClick={this._submit}
      />,
    ];
    return (
      <div>{data === true? <Load animationHeight={30} />: <div style={{
        width: '102.4rem',
        minHeight: '30rem',
        margin: 'auto'
      }}
      className="leaveMessage"
      > <div>
          <List>
          {data.map((item, i) => {
            return <div style={leaveContainer.listStyle}
            className="leave"
            key={i}
            >
              <div style={leaveContainer.listStyle__head}
              className="headUrl"
              ><div style={leaveContainer.listStyle_url}>
                <img src={item.url} />
              </div>
              <div style={{fontSize: '2rem', fontFamily: 'time'}}>
                {item.author}
              </div></div>
              <div style={leaveContainer.listStyle__right}>
              <div style={leaveContainer.listStyle__right__content}>
                {item.content}
              </div>
              <div>
              <div style={leaveContainer.listStyle__right__name} 
              className="cellphone">
                {item.author}
              </div>
              <div style={leaveContainer.listStyle__right__date}
              className="leaveTime"
              >发布于: {item.date}</div>
            </div>
            </div>
            </div>
          })}
          </List>
          <div style={{
            minHeight: '10rem'
          }}>
            <RaisedButton label="下一页" primary={true} onClick={this._changPageContent} />
            <RaisedButton
              onClick={this._dialogArise}
              label="我要留言" primary={true}  />
            <p style={{
              fontSize: '1.6rem'
            }}>当前页数>>>>{this.state.page}</p>
          </div>
        </div>
        <div>
          <Dialog
            title="留言"
            actions={actions}
            modal={true}
            open={this.state.open}
          >
          <TextField
            hintText="请输入内容"
            className="leaveInput"
            onChange={(e, text) => this.setState({inputLeave: text, isSubmit: false})}
          /><br />
          </Dialog>
        </div>
        <div>
        <Snackbar
          open={this.state.openClose}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this._handleRequestClose}
        />
        </div>
      </div>}
      </div>
    )
  }
}

const leaveContainer = {
  listStyle: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '15rem',
    padding: '2rem',
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  listStyle__head: {
    width: '10%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listStyle_url: {
    width: '80%',
    height: '50%',
    background: 'gray',
    borderRadius: '50%'
  },
  listStyle__right: {
    width: '70%',
    paddingLeft: '10%',
    paddingRight: '10%' 
  },
  listStyle__right__content: {
    height: '70%',
    fontSize: '1.6rem',
    fontFamily: 'time'
  },
  listStyle__right__name: {
    display: 'none',
    fontSize: '1.6rem',
    fontFamily: 'time'
  },
  listStyle__right__date: {
    height: '30%',
    fontSize: '1.6rem',
    textAlign: 'end',
    fontFamily: 'time'
  }
}

const getMessage = (state) => {
  return {
    messages: state.getLeaveMessage.message
  }
}

const layInLeave = (dispatch) => {
  return {
    sendLeave: (value) => {dispatch({
      type: '_LEAVEMESSAGE',
      data: value
    })}
  }
}

export default connect(
  getMessage,
  layInLeave
)(leaveMessage)