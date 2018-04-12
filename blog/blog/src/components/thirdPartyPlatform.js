import React, { Component } from 'react';
import {
  IconButton
} from 'material-ui';
import createHistory from "history/createBrowserHistory";
const history = createHistory();

class thirdPartyPlatform extends Component {
  componentWillMount(){
    console.log(this.props)
  }
  _loginGithub = () => {

  }
  _loginQQ = () => {
    let p = {
      url:'https://tianchenyong.top',
      showcount:'1',                           /* 是否显示分享总数,显示：'1'，不显示：'0'     */
      desc: 'emmmmm',                          /* 默认分享理由(可选)                         */
      summary: '',                             /* 分享摘要(可选)                             */
      title: '',                               /* 分享标题(可选)                             */
      site: 'https://tianchenyong.top',        /* 分享来源 如：腾讯网(可选)                   */
      pics: 'www.baidu.com/img/bd_logo1.png',  /* 分享图片的路径(可选)                        */
      style: '203',
      width: 98,
      height: 22
    }
      var s = [];
    for(let i in p){
      s.push(i + '=' + encodeURIComponent(p[i]||''));
    }
    window.open(`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?${s.join('&')}&otype=share`)
  }
  _loginWechat = () => {

  }
  _sendInformation = () => {
      
  }
  render() {
    return (
      <div>
        <IconButton
          iconClassName="icon-github" tooltip="github"
          onClick={() => {this._loginGithub()}}
        />
       <IconButton
         iconClassName="icon-tencentqq" tooltip="QQ"
         onClick={() => {this._loginQQ()}}
       />
       <IconButton
         iconClassName="icon-wechat" tooltip="wechat"
         onClick={() => {this._loginWechat()}}
       />
      </div>
    )
  }
}

export default thirdPartyPlatform