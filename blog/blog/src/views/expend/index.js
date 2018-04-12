import React, { Component } from 'react';
import MaterialImage from 'material-image';
import {MOREDATA} from '../../api';
import {moreData} from '../../data'

class drawer extends Component{
  constructor(props){
    super(props)
    this.state = {
      backgroundCase: '',
      moreConten: ''
    }
  }
  async componentWillMount() {
    try{
      const content = await MOREDATA.getMoreData()
      const data = content.data.data
      this.setState({
        moreConten: data
      })
    }catch(e) {
      this.setState({
        moreConten: moreData
      })
      console.log(e)
    }
  }
  componentDidMount(){
    const myDom = document.querySelector('.good');
    const backgroundCase = new MaterialImage({
      el: myDom,
    });
    this.setState({
      backgroundCase: backgroundCase
    })
  }
  _changeBackground = () => {
    this.state.backgroundCase.protract()
  }
  render() {
    const data = this.state.moreConten? this.state.moreConten: []
    return (
     <div>
     <div className ="good" style={{
        height: '20rem'
       }} onClick={this._changeBackground}>
     </div>
     <div>
       {data.map((item, i) => {
          return <a href={item.url} key={i}><div
           style={{
             height: '5rem',
             textAlign: 'center',
             lineHeight: '5rem',
             fontSize: '1.8rem',
             fontFamily: 'time',
             padding: '1rem'
           }}
           className="more"
          >{item.name}</div></a>
       })}
     </div>
     </div>
    )
  }
}

export default drawer