import React, { Component } from 'react';
import {AriticleList} from '../../data';
import {List, ListItem, FontIcon, Toggle, RaisedButton} from 'material-ui';
import {Link} from 'react-router-dom'

class blogRight extends Component{
  constructor(props){
    super(props)
    this.state={
      replaceIcon: {
        python: 'icon-python',
        javaEE: 'icon-coursera',
        java: 'icon-coursera',
        vue: 'icon-vuejs',
        react: 'icon-react',
        javascript: 'icon-coursera',
        c: 'icon-coursera',
        default: 'icon-coursera'
      },
      arise: [],
      AriticleListData: this.props.ariticListData
    }
  }
  async componentWillMount(){
    const lengths = Object.keys(this.state.AriticleListData).length
    const objectArray = await new Array(lengths).fill(false)
    this.setState({
      arise: objectArray
    })
  }
  _handleToggle = async(index) => {
    const data = await this._changeArray(index)
    this.setState({arise: data});
  }
  _changeArray = (index) => {
    let openOrClose = Object.assign([], this.state.arise)
    openOrClose.map((item, i) => {
      if (i === index){
        openOrClose[index] = !openOrClose[index]
      }
    })
    return openOrClose
  }
  render () {
    let icon = this.state.replaceIcon
    let data = this.state.AriticleListData
    return (
      <div>
        <div style={{
          minHeight: '5rem',
          textAlign: 'center',
          fontSize: '1.8rem'
        }}
        >文章分类</div>
        <div>
          <List>
            {Object.keys(data).map((item, i) => {
              return <div key={i}><div style={{
                 minHeight: '5rem',
                 textAlign: 'center',
                 fontSize: '1.8rem',
                 fontFamily: 'time',
                 lineHeight: '5rem'
              }}><Toggle
                toggled={this.state.arise[i]}
                onToggle={() => {this._handleToggle(i)}}
                labelPosition="right"
              />{item}</div>{this.state.arise[i]?<div>{(data[item]).map((items, i) => {
                return <ListItem
                  key={i}
                  style={{
                    height: '5rem',
                    lineHeight: '1rem'
                  }}
                  onClick={() => this.props.ajaxRightConten(item, items.id)}
                  primaryText={items.title}
                  rightIcon={<FontIcon className={icon.hasOwnProperty(item)? icon[item]: icon.default} />}       
                />
              })}</div>: null}
              </div>
            })}
          </List>
          <div style={{
            minHeight: '10rem',
            marginBottom: '4rem',
            marginTop: '4rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}><div><FontIcon className="icon-spinner10 App-logo" style={{
          fontSize: '5rem'
        }}/></div><div><Link to={{
          pathname: '/label',
          search: `tab=${Object.keys(data)[0]}&page=1`
        }}><RaisedButton label="更多" primary={true}  /></Link></div></div>
        </div>
        
      </div>
    )
  }
}

export default blogRight