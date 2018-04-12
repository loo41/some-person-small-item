import React, { Component } from 'react';
import {AriticleList, labelLengths} from '../../data';
import Load from '../../components/loading'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {LABEL, axios} from '../../api';
import LabelContent from '../../components/labelContent'
const NOWROUTER = '?tab=java&page=1'

class label extends Component {
  constructor(props){
    super(props)
    this.state={
      labelData: false,
      labelLength: false,
      content: [],
      account: '',
      isLabel: ''
    }
  }
  
  async componentWillMount(){
    await this._chekUpUpdate()
  }

  _getListData = (items) => {
    const fristLabel = Object.keys(this.state.labelData)[0]
    const fristTitle = this.state.labelData[items || fristLabel]
    this.setState({
      content: fristTitle,
      isLabel: fristLabel,
    })
    this.props.location.search === NOWROUTER? this.setState({
      account: this.state.labelLength[fristLabel]
    }): this.setState({
      account: this.state.labelLength[items]
    })
  }

  _axios = (fn) => {
    return fn
  }

  _chekUpUpdate = async () => {
    if (this.props.labelValue &&
      this.props.location.search === NOWROUTER
    ) {
      await this._fristConten()
      this._getListData()
      return
    }
    try{
      const labelListData = await axios.all([
        this._axios(LABEL.aritcle()), 
        this._axios(LABEL.listLengths())
      ])
      const list = await labelListData.data.data[0]
      const labelDatas = await labelListData.data.data[1]
      this.setState({
        labelData: labelDatas,
        labelLength: list
      })
      if (!(this.props.location.search === NOWROUTER)) {
        this._getListData(this.props.location.state.tab)
        return
      }
      this.props.changeLabelList(list)
      this.props.changeLabelVlaue(labelDatas)
      this._getListData()
    }catch(e) {
      this.setState({
        labelData: AriticleList,
        labelLength: labelLengths
      })
      if (!(this.props.location.search === NOWROUTER)) {
        this._getListData(this.props.location.state.tab)
        console.log(e)
        return
      }
      this.props.changeLabelList(labelLengths)
      this.props.changeLabelVlaue(AriticleList)
      this._getListData()
      console.log(e)
    }
  }

  _fristConten = async() => {
    if (this.props.labelLength) {
      await this.setState({
        labelData: this.props.labelValue,
        labelLength: this.props.labelLength
      })
      this._getListData()
      return
    }
    try{
      const listLengths = await LABEL.listLengths()
      const list = await listLengths.data.data
      await this.setState({
        labelData: this.props.labelValue,
        labelLength: list
      })
      this.props.changeLabelList(list)
    }catch(e){
      console.log(e)
      await this.props.changeLabelList(labelLengths)
      await this.setState({
        labelData: this.props.labelValue,
        labelLength: labelLengths
      })
      return
    }
  }

  _changeLabel = (item) => {
    this.setState({
      content: this.state.labelData[item],
      account: this.state.labelLength[item],
      isLabel: item
    })
  }

  render () {
    const labels = Object.keys(this.state.labelData)
    return (
      <div>{this.state.labelData===false? <Load animationHeight={30}/>:
      <div style={labelContainer.labelStyle}
        className="labelPageStyle">
      <div style={labelContainer.labelStyle__label}>
        {labels.map((item, i) => {
          return <Link  to={{
            pathname: '/label',
            search: `?tab=${item}&page=1`
          }}
          key={i}
          ><div
          className="labelHover"
          style={labelContainer.labelStyle__label__content}
            children={<div style=
              {labelContainer.labelStyle__label__content__content}>{item}</div>}
            onClick={() => {this._changeLabel(item)}}
          />
          </Link >
        })}
      </div>
      <div style={{
        minHeight: '20rem'
      }}>
      <LabelContent
        contents={this.state.content}
        account={this.state.account}
        label={this.state.isLabel}
        history={this.props.history}
      />
      </div>
      </div>}
      </div>
    )
  }
}
const labelContainer = {
  labelStyle: {
    width: '50%',
    margin: "auto"
  },
  labelStyle__label: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'row',
    margin: '5rem'
  },
  labelStyle__label__content: {
    marginRight: '1rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    cursor: 'pointer'
  },
  labelStyle__label__content__content: {
    textAlign: 'center',
    fontSize: '1.8rem',
    fontFamily: 'time',
    padding: '1rem'
  }
}

const labelVlaue = (state) => {
  return {
    labelValue: state.getLabelData.labelListValue,
    labelLength: state.getLabelData.labelLengths
  }
}

const changeLabelVlaue = (dispatch) => {
  return {
    changeLabelVlaue: (value) => {dispatch({
      type: '_CHANGLABELDATA',
      data: value
    })},
    changeLabelList: (value) => {dispatch({
      type: '_CHANGLABELLIST',
      data: value
    })}
  }
}

export default connect(
  labelVlaue,
  changeLabelVlaue
)(label)