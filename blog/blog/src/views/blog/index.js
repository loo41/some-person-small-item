import React, { Component } from 'react';
import {blogDatas, AriticleList} from '../../data';
import Comment from '../../components/comment';
import {connect} from 'react-redux';
import CommentContent from '../../components/commentContent';
import {location, match} from 'react-router-dom';
import Load from '../../components/loading';
import {axios, BLOG} from '../../api';
import BlogRight from './blogRight';
const ARRDER = '?tab=recommendation&articleID=1';

class blog extends Component {
  constructor(props){
    super(props)
    this.state={
      blogData: false,
      blogRightData: ''
    }
    this.notclick = false
  }

  _ajax = (fn) => {
    return fn
  }
  _getAriticData = async(item, index) => {
    if (this.notclick)return
    try{
      this.notclick = true
      const data = await BLOG.blogContent(`?tab=${item}&articleID${index}`)
      const content = await data.json()
      await this.setState({
        blogData: content
      })
      this.notclick = false
      this.props.history.push(`/blog?tab=${item}&articleID${index}`)
    }catch(e){
      this.notclick = false
      console.log(e)
    }
  }
  _getBlogVlaue = async() => {
    try{
      const content = await axios.all([
        this._ajax(BLOG.blogContent(this.props.location.search)), 
        this._ajax(BLOG.aritcle())
      ])
      const datas = content.data.data
      this.setState({
        blogData: datas[0],
        blogRightData: datas[1]
      })
      if (this.props.location.search === ARRDER) {
        this.props.changeBlogVlaue(datas)
        this.props.changeLabelVlaue(datas[1])
      }
    }catch(e){
      this.setState({
        blogData: blogDatas,
        blogRightData: AriticleList
      })
      if (this.props.location.search === ARRDER) {
        this.props.changeBlogVlaue([blogDatas, AriticleList])
        this.props.changeLabelVlaue(AriticleList)
      }
      console.log(e)
    }
  }

  async componentDidMount(){
    if (this.props.blogValue.blogData 
      && this.props.location.search === ARRDER) {
      this.setState({
        blogData: this.props.blogValue.blogData,
        blogRightData: this.props.blogValue.blogRightData
      })
      return
    }
    await this._getBlogVlaue()
  }

  _creatHtml = () => {
    return {__html: this.state.blogData.content}
  }
  render () {
    const blogData = this.state.blogData
    return (
      <div>
      {blogData === false? <Load 
      animationHeight={'50'}/>: 
      <div className="blogContainer" style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>
      <div className="blogStyle">
      <div style={{minHeight: '15rem'}}>
        <div style={titleStyle}>{blogData.title}</div>
        <div style={discriptionStyle}>{blogData.discription}</div>
        <div style={{
          fontSize: '1.5rem',
          textAlign: 'end',
          fontFamily: 'Roboto, sans-serif'
        }}
        >发布于: {blogData.time}</div>
      </div>
      <div style={{fontSize: '1.6rem', marginTop: '3rem', fontFamily: 'Roboto, sans-serif'}}>
      <div dangerouslySetInnerHTML={this._creatHtml()} />
      </div>

      <div>
        <CommentContent
          control={true}
          closeOpen={false}
        />
      </div>

      <div style={leaveWorldStyle}>
        <Comment 
          control={true} 
          closeOpen={false}
          bottomStyle={bottomLess}
        />
      </div>
      </div>
      <div style={{
        width: '30%',
        minHeight: '20rem',
        background: 'white'
      }}
      className="blogRight"
      ><BlogRight
        ariticListData={this.state.blogRightData}
        ajaxRightConten={this._getAriticData}
      /></div>
      </div>}
      </div>
    )
  }
}
const titleStyle = {
  textAlign: 'center',
  fontSize: '2.5rem',
  minHeight: '6rem',
  lineHeight: '10rem',
  fontFamily: 'time'
}
const discriptionStyle = {
  minHeight: '5rem',
  fontSize: '1.4rem',
  textIndent: '4rem',
  fontFamily: 'time'
}
const leaveWorldStyle = {
  minHeight: '10rem',
  marginTop: '2rem'
}
const bottomLess = {
  padding: '1rem'
}

const blogVlaue = (state) => {
  return {
    blogValue: state.getBlogData
  }
}

const changeBlogVlaue = (dispatch) => {
  return {
    changeBlogVlaue: (value) => {dispatch({
      type: '_CHANGBLOGDATA',
      data: value
    })},
    changeLabelVlaue: (value) => {dispatch({
      type: '_CHANGLABELDATA',
      data: value
    })}
  }
}

export default connect(
  blogVlaue,
  changeBlogVlaue
)(blog)