import React, { Component } from 'react';
import {
  CardText, 
} from 'material-ui';
import {HOME} from '../../api';
import {
  GridList,
  Card, CardActions, 
  CardHeader, 
  CardTitle, Toggle,
  FlatButton, Step,
  Stepper, StepLabel,
  RaisedButton, CardMedia
} from 'material-ui';
import Load from '../../components/loading';
import {connect} from 'react-redux';
import createHistory from "history/createBrowserHistory";
import {homeDatas} from '../../data';
import imgs from '../../static/images/5.jpg'
const history = createHistory()


class mainRight extends Component {
  constructor(props){
    super(props)
    this.state = {
      homeData: true,
      expanded: [],
      stepIndex: 1,
      finished: false,
      redirect: false,
      contentContainer: []
    }
    this.notClick = true
  }

  _getData = async() => {
    try{
      this.notClick = false
      const content = await HOME.homeData({page: 1})
      const dataList = await content.data.data
      this.setState({
        homeData: dataList,
        contentContainer: this.state.contentContainer.push(dataList)
      })
      await this.props.changeFristRightData(dataList)
      this.notClick = true
    }catch(e){
      this.setState({
        homeData: homeDatas,
        contentContainer: this.state.contentContainer.push(homeDatas)
      })
      await this.props.changeFristRightData(homeDatas)
      this.notClick = true
      console.log(e)
    }finally{
      const expandLength = this.state.homeData.length
      let addLess = await new Array(expandLength).fill(true)
      this.setState({
        expanded: addLess
      })
    }
  }

  async componentWillMount() {
    if(this.props.rightData) {
      this.setState({
        homeData: this.props.rightData,
        contentContainer: this.state.contentContainer.push(this.props.rightData)
      })
      const expandLength = this.props.rightData.length
      let addLess = await new Array(expandLength).fill(true)
      this.setState({
        expanded: addLess
      })
      return
    }
    this._getData()
  }

  handleExpandChange = async(i) => {
    let changeOpenClose = this.state.expanded[i]
    const getClose = await this._changeArray(i, !changeOpenClose)
    this.setState({expanded: getClose});
  };

  handleToggle = async(event, toggle, i) => {
    let changeOpenClose = this.state.expanded[i]
    const getClose = await this._changeArray(i, !changeOpenClose)
    this.setState({expanded: getClose});
  };

  handleExpand = async(i) => {
    if (this.state.expanded[i] === true) return
    const getClose = await this._changeArray(i, true)
    this.setState({expanded: getClose});
  };

  _changeArray = (index, value) => {
    let openOrClose = Object.assign([], this.state.expanded)
    openOrClose.map((item, i) => {
      if (i === index){
        openOrClose[index] = value
      }
    })
    return openOrClose
  }

  handleReduce = async(i) => {
    if (this.state.expanded[i] === false) return
    const getClose = await this._changeArray(i, false)
    this.setState({expanded: getClose});
  };

  _handlePrev = async() => {
    const {stepIndex} = this.state
    if (stepIndex <= 1 || this.notClick === false) return
    this.notClick = false
    if (stepIndex > 1) {
      this.setState({
        homeData: this.state.contentContainer[stepIndex-2],
        stepIndex: stepIndex - 1
      })
      history.push(`/home?page=${stepIndex - 1}`)
    }
    return
  }

  _send = async(i) => {
    try{
      const data = await HOME.homeData({page: i})
      const dataList = data.json()
      this.setState({
        homeData: dataList,
        contentContainer: this.state.contentContainer.push(dataList)
      })
      this.notClick = true
      return 1
    }catch(e){
      this.notClick = true
      console.log(e)
      return 0
    }
  }

  _handleNext = async(i) => {
    const pageLengths = Math.ceil(this.props.listLengths)
    console.log(pageLengths)
    if (i >= pageLengths || this.notClick === false) return
    this.notClick = false
    if (!await this._send(i + 1)) return
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= pageLengths,
    });
    history.push(`/home?page=${stepIndex+1}`)
  }

  render() {
    const homeData = this.state.homeData
    const stepIndex = this.state.stepIndex
    const homeListLength = Math.ceil(
      this.props.listLengths? this.props.listLengths: this.props.account
    )
    const getList = new Array(homeListLength).fill(0)
    return (
      <div>
        <GridList
         className="changeCardHeight"
         style={{
           minHeight: '18.4rem'
         }}
        >
        {homeData === true? 
        <Load
          animationHeight={18.4}
        />: this.state.homeData.map((item, i) => (
        <Card
          key={i}
          expanded={this.state.expanded[i]} 
          onExpandChange={() => {this.handleExpandChange(i)}}
        >
        <CardHeader
          title="LoveLife"
          subtitle="生活不应该苟且于当下"
          avatar={imgs}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText>
          <Toggle
            toggled={this.state.expanded[i]}
            onToggle={(event, toggle) => {this.handleToggle(event, toggle, i)}}
            labelPosition="right"
            label="打开/关闭"
          />
        </CardText>
        <CardTitle title={item.title} expandable={true} />
        <CardMedia
          expandable={true}
        >
          <img src={item.img} alt="" />
        </CardMedia>
        <CardText expandable={true}>
          {item.discription}
        </CardText>
        <CardText expandable={true}>
          发布日期: {item.time}
        </CardText>
        <CardActions>
          <FlatButton label="open" onClick={() => {this.handleExpand(i)}} />
          <FlatButton label="close" onClick={() => {this.handleReduce(i)}} />
        </CardActions>
      </Card>
        ))}
      </GridList>
      <div>
      <div>
      <Stepper style={{
        flexWrap: 'wrap'
      }}
      activeStep={stepIndex-1}
      >
        {getList.map((item, i) => {
         return (
          <Step
           key={i}
          >
            <StepLabel>{i+1}</StepLabel>
          </Step>
         )
        })}
        </Stepper>
      </div>
      <div style={{
        minHeight: '8rem'
      }}>
      <FlatButton
        label="Back"
        onClick={this._handlePrev}
        disabled={stepIndex === 1}
        style={{marginRight: 12}}
      />
      <RaisedButton
        label={stepIndex === getList.length? 'Finish' : 'Next'}
        primary={true}
        onClick={() => {this._handleNext(stepIndex)}}
      />
      </div>
      </div>
      </div>
    );
  }
}

const homeFristLiftData = (state) => {
  return {
    rightData: state.getHomePageData[1].homePageOneRightData,
    account: state.getHomePageData[2].account
  }
}

const changeFristRightData = (dispatch) => {
  return {
    changeFristRightData: (value) => {dispatch({
      type: '_CHANGEHOMERIGHTDATA',
      data: value
    })}
  }
}

export default connect(
  homeFristLiftData,
  changeFristRightData
)(mainRight)