import React, { Component } from 'react';
import {FontIcon, GridList, Avatar, CircularProgress, LinearProgress, Snackbar} from 'material-ui';
import { connect } from 'react-redux';
import {NORTICE} from '../../api'
import {tilesDatas} from '../../data'

class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tilesData: null,
      tilesDatas,
      open: false,
      message: '公示内容不存在',
      aboutUs: `我们来自天津身上月大学我们来自天津身上月大学
                我们来自天津身上月大学我们来自天津身上月大学
                我们来自天津身上月大学我们来自天津身上月大学
                我们来自天津身上月大学我们来自天津身上月大学
                我们来自天津身上月大学我们来自天津身上月大学`
    }
  }
  _getData = async() => {
    try {
      if (this.props.list){
        this.setState({tilesData: this.props.list.slice(0, 4)})
        return
      }
      const list = await NORTICE.getFristList({page: 1})
      const listContent = await list.data.data
      this.setState({tilesData: listContent.reverse().slice(0, 4)})
      this.props.sendData(listContent)
    } catch(e) {
      console.log(e)
    }
  }

  componentWillMount() {
    this._getData()
  }

  _more = (Router, value) => {
    this.props.history.push(Router)
  }

  _content = async(id) => {
    if(!id) {
      this.setState({open: true})
    }
    this.props.history.push(`/content?id=${id}`)
  }

  render() {
    const tilesDatas = this.state.tilesDatas 
    return (
      <div style={{ paddingBottom: '1rem'}} id="content">
        <div>
          <p className="content"><FontIcon className="icon-plus" style={{paddingRight: '1rem', color: 'white'}}/><span>关于我们</span></p>
          <p style={contentContainer.textStyle}>
            {this.state.aboutUs}
          </p>
        </div>
        <div>
          <p className="content"><FontIcon className="icon-bullhorn" style={{paddingRight: '1rem', color: 'white'}}/><span>通知公告</span></p>
          <p style={contentContainer.rowStyle}>
            {this.state.tilesData === null? 
            <p style={{
              display: 'flex', 
              justifyContent: 'center'}}>
              <CircularProgress size={80} thickness={5} color={'white'}  className="processStyle"/>
              <div style={{
                height: '40%',
                width: '100%',
                fontSize: '1.8rem',
                color: 'white',
                textAlign: 'center',
                display: 'none'
              }} className="load">加载中...</div>
            </p>: 
            this.state.tilesData.map((item, i) => {
              return <p style={contentContainer.boxStyle} key={i} onClick={() => {this._content(item.id)}}>
              <FontIcon className="icon-phone" style={{padding: '1rem', color: 'white'}}/><span style={{
                height: '100%',
                width: '100%',
                lineHeight: '2rem'
              }}>{item.title}</span></p>
            })}
            <p style={contentContainer.moreStyle} onClick={() => this._more('/notice/page=1', 'd')}>
              <FontIcon className="icon-forward3" style={{paddingRight: '1rem', color: 'white'}}/>
              <span>更多</span>
            </p>
          </p>
        </div>

        <div>
          <p className="content">
            <FontIcon className="icon-phone" style={{paddingRight: '1rem', color: 'white'}}/><span>联系我们</span></p>
          <p>
          {tilesDatas.map((item, i) => {
              return <p style={contentContainer.boxStyle} key={i}>
              <FontIcon className="icon-phone" style={{padding: '1rem', color: 'white'}}/>
                <span>{item.title}:</span><span style={{marginLeft: '1rem'}}>{item.content}</span>
              </p>
            })}
            <p style={contentContainer.moreStyle} onClick={() => this._more('/contactUs', 'e')}>
              <FontIcon 
                className="icon-forward3" 
                style={{paddingRight: '1rem', color: 'white'}}
              />
              <span>更多</span>
            </p>
            </p>
        </div>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

const contentContainer = {
  textStyle: {
    padding: '1rem', 
    fontSize: '1.6rem', 
    color: 'white', 
    textIndent: '5rem'
  },
  boxStyle: {
    paddingLeft: '1rem', 
    paddingRight: '1rem',
    fontSize: '1.4rem',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    margin: '0rem'
  },
  rowStyle: {
    height: '22rem',
    overflowX: 'hidden', 
    overflowY: 'auto'
  },
  moreStyle: {
    lineHeight: '2rem',
    minHeight: '2rem',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    marginRight: '1rem',
    marginRight: '1rem'
  }
}


const changeIndexAndData = (dispatch) => {
  return {
    sendData: (value) => dispatch({
      type: '_NOTICEDATA',
      data: value
    }),
    changeIndex: (value) => dispatch({
      type: '_CHANGESTYLE',
      data: value
    })
  }
}



export default connect(changeIndexAndData)(Content)