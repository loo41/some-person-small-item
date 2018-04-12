import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  GridList,
  GridTile,
  Stepper,
  Step,
  StepButton,
  FlatButton,
  RaisedButton
} from 'material-ui';
import {Link} from 'react-router-dom';
import {LABEL} from '../api'

class content extends Component{
  constructor(props){
    super(props)
    this.state={
      stepIndex: 0,
      listData: false,
      value: [].push(this.props.content)
    }
    this.ontClick =  false
  }
  handleNext = async(item) => {
    if (this.ontClick) return
    try{
      this.ontClick = true
      const list = await LABEL.listData({tab:`${item}`, page: `${this.state.stepIndex+2}`})
      const listDatas = list.json()
      const {stepIndex} = this.state;
      if (stepIndex < Math.ceil(this.props.account/5)) {
        this.setState({
          stepIndex: stepIndex + 1,
          listData: listDatas,
          value: this.state.value.push(listDatas)
        });
      }
      this.props.history.push(`/label?tab=${item}&page${this.state.stepIndex+2}`)
    }catch(e){
      console.log(e)
    }finally{
      this.ontClick = false
    }
  }

  handlePrev = (item) => {
    if (this.ontClick) return
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({
        listData: this.state.value[this.state.stepIndex - 1],
        stepIndex: stepIndex - 1
      })
      this.props.history.push(`/label?tab=${item}&page${this.state.stepIndex}`)
    }
  }
  render () {
    const {label, history, contents} = this.props
    const data = this.state.listData? this.state.listData: contents
    const stepIndex = this.state.stepIndex
    const dataLengths = Math.ceil(this.props.account/5)
    return (
      <div>
       <GridList className="headStyle">
         {data.map((item, i) => {
           return <Link
           key={i} 
           to={{
             pathname: '/blog',
             search: `tab=${label}&articleID=${item.id}`
           }}><GridTile
             key={i}
             title={item.title}
             style={{
               fontFamily: 'time'
             }}
           /></Link>
         })}
       </GridList>
       <div style={{
         marginTop: '2rem',
         marginBottom: '2rem'
       }}>
       <Stepper linear={false} activeStep={stepIndex} style={{
         flexWrap: 'wrap'
       }}>
        {new Array(dataLengths).fill(1).map((item, i) => {
          return <Step key={i}>
          <StepButton>
            第{i+1}页
          </StepButton>
        </Step>
        })}
        </Stepper>
        <div>
        <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              onClick={() => {this.handlePrev(label)}}
              style={{marginRight: 12}}
            />
            <RaisedButton
              label="Next"
              disabled={stepIndex === dataLengths-1}
              primary={true}
              onClick={()=>{this.handleNext(label)}}
            />
        </div>
       </div>
      </div>
    )
  }
}

content.PropTypes = {
  contents: PropTypes.array
}

export default content