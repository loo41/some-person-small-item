import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FontIcon, RaisedButton, Snackbar} from 'material-ui';
import {NORTICE} from '../api'
import {data, datas} from '../data'


class Notice extends Component {
  constructor(props) {
    super(props)
    this.state={
      data: null,
      open: false,
      message: 'error',
      index: 1,
      allData: []
    }
    this.allData = []
    this.ontClick=false
    this.noPage = false
  }

  _content = async(id) => {
    if(!id) {
      this.setState({open: true})
    }
    this.props.history.push(`/content?id=${id}`)
  }
  
  _getFristPageList = async() => {
    try{
      const list = await NORTICE.getFristList({page: 1})
      const data = await list.data.data
      this.setState({
        data: data.reverse(),
      })
      if (list.data.mes === '没有下一页了') {
        this.noPage = true
      }
      this.allData.push(data)
    } catch (e) {
      this.setState({data})
      this.allData.push(data)
      console.log(e)
    }
  }

  componentWillMount() {
    this._getFristPageList()
  }

  _backPage = async() => {
    if(this.state.index === 1) {
      this.setState({
        open: true,
        message: '没有更少了'
      })
      return
    }
    this.setState({
      data: this.allData[this.state.index-2],
      index: this.state.index-1
    })
    this.noPage = false
    this.props.history.push(`/notice/page=${this.state.index-1}`)
  }

  _downPage = async() => {
    console.log(this.noPage)
    if (this.noPage) {
      this.setState({
        open: true,
        message: '没有下一页了'
      })
      return
    }
    try{
      if (this.ontClick) {
        this.setState({
          open: true,
          message: '不支持重复点击'
        })
        return
      }
      this.ontClick = true
      const lists = await NORTICE.getMoreList({page: this.state.index + 1})
      const listTitle = await lists.data.data
      if (lists.data.mes === '没有下一页了') {
        this.noPage = true
      }
      this.props.history.push(`/notice/page=${this.state.index+1}`)
      this.setState({
        data: listTitle.reverse(),
        index: this.state.index+1
      })
      this.allData.push(listTitle)
    }catch(e){
      console.log(e)
      this.setState({
        open: true,
        message: 'error'
      })
    }finally{
      this.ontClick = false
    }
  }

  render() {
    return (
      <div>
        <div style={styles.boxStyle} className="briefingContentStyle">
        <div style={{
          height: '3rem',
          borderBottom: '2px solid red',
          textAlign: 'center',
          fontSize: '2rem',
          lineHeight: '3rem',
          marginBottom: '1rem'
        }}>公示公告</div>
          <div>
          {this.state.data===null? null: this.state.data.map((item, i) => {
            return <div key={i}>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: '4rem'
              }}
              onClick={() => {this._content(item.id)}}
              >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                width: '70%'
              }}>
                <FontIcon className="icon-bullhorn" style={{paddingRight: '2rem', paddingLeft: '2rem'}}/>
                <span  style={{fontSize: '1.4rem'}}>{item.title}</span>
              </div>
              <div style={{paddingRight: '2rem', fontSize: '1.4rem', width: '30%', textAlign: 'center'}}>
               <span style={{paddingRight: '1rem'}} className="noticeDateStyle">发布日期:</span>
               {item.date}
              </div>
              </div>
            </div>
          })}
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '2rem',
            width: '40rem',
            justifyContent: 'space-between'
          }} className="butStyle">
          <RaisedButton
              label="上一页"
              labelPosition="before"
              primary={true}
              icon={ <FontIcon className="icon-coursera" />}
              style={styles.button}
              onClick={this._backPage}
            />
          <div style={{fontSize: '1.6rem'}}><span style={{
            marginRight: '1rem', 
            textAlign: 'center', 
            lineHeight: '3rem'
            }}>page:</span>{this.state.index}</div>
          <RaisedButton
              label="下一页"
              labelPosition="before"
              primary={true}
              icon={ <FontIcon className="icon-coursera" />}
              style={styles.button}
              onClick={this._downPage}
            />
          </div>
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

const styles = {
  boxStyle: {
    width: '102.4rem',
    minHeight: '50rem',
    margin: '0 auto',
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  button: {
    padding: '0.5rem'
  }
}





export default Notice