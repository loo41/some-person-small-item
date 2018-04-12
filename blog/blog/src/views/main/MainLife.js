import React, { Component } from 'react';
import Label from '../../components/Label';
import ArticleData from '../../components/ArticleData';
import ThirdPlatform from '../../components/thirdPartyPlatform';
import {HOME} from '../../api';
import Time from '../../components/Time';
import Load from '../../components/loading';
import { connect } from 'react-redux';
import {lableData} from '../../data';
import {
  Card, 
  CardHeader, 
  CardText,
  FontIcon
} from 'material-ui';



class mainLife extends Component {
  constructor(props){
    super(props)
    this.state={
      nowTime: '',
      indexData: false
    }
  }
  async componentWillMount(){
    if (this.props.homePageOneData) {
      this.setState({
        indexData: this.props.homePageOneData
      })
      this.props.getListLengths(this.props.homePageOneData.account)
      return
    }
    try{
      const content = await HOME.overallData({page: 1})
      this.setState({
        indexData: content.data.data
      })
      this.props.changeFristData(content.data.data)
      this.props.getListLengths(content.data.data.account)
    }catch(e){
      console.log(e)
      this.setState({
        indexData: lableData
      })
      this.props.changeFristData(lableData)
      this.props.getListLengths(lableData.account)
    }
  }
  render() {
    const indexInformation = this.state.indexData
    return (
    <div>
    {indexInformation === false? <Load animationHeight={18.4}/>: <Card>
    <div>
    <CardHeader 
      title="时间"
      style={{fontFamily: 'title'}}
      children={<FontIcon className="icon-clock App-clock" />}
    />
    <Time
      timeStyle={timeStyle}
    />
    </div>
    <div>
    <CardHeader 
      title="标签"
      style={{fontFamily: 'title'}}
      children={<FontIcon className="icon-price-tags" />}
    />
    <CardText
     children={<div><Label
                labels={indexInformation.label}
                chipStyle={lableStyle}
              /></div>}
     />
    </div> 
    <div>
    <CardHeader 
      title="数据"
      style={{fontFamily: 'title'}}
      children={<FontIcon className="icon-database" />}
    />
    <CardText
     children={<div><ArticleData
                data={indexInformation}
                dataStyle
              /></div>}
    />
    </div>
    <div>
    <CardHeader 
      title="连接"
      style={{fontFamily: 'title'}}
      children={<FontIcon className="icon-share2" />}
    />
    <CardText
     children={<div>
                <ThirdPlatform />
              </div>}
    />
    </div>
  </Card>}
  </div>
    );
  }
}
const lableStyle = {
  display: 'inline-block',
  height: '3.6rem',
  backgroundColor: 'white',
  boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)'
}
const timeStyle = {
  fontFamily: 'time',
  fontSize: '1.8rem'
}

const fristPageData = (state) => {
  return {
    homePageOneData: state.getHomePageData[0].homePageOneLeftData
  }
}

const changeFristData = (dispatch) => {
  return {
    changeFristData: (value) => {dispatch({
      type: '_CHANGEHOMEDATA',
      data: value
    })}
  }
}


export default connect(
  fristPageData,
  changeFristData
)(mainLife)