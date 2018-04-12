import React, { Component } from 'react';
import PropTypes from 'prop-types';
import imgs from '../static/images/5.jpg'
import {
  List,
  ListItem,
  Avatar,
  FontIcon,
  Subheader
} from 'material-ui';
import {Link} from 'react-router-dom';


class ariticleDate extends Component {
  constructor(props){
    super(props)
    this.state={
      datas: this.props.data,
      likeData: this.props.data.good,
      onClickOne: 0
    }
  }
  _like = () => {
    if (this.state.onClickOne === 1) {
      this.setState({
      likeData: this.state.likeData-1,
      onClickOne: 0
    })
    return
    }
    this.setState({
      likeData: this.state.likeData+1,
      onClickOne: 1
    })
  }
  componentWillUnmount(){
    if (this.state.likeData 
      === this.props.data.good + 1
    ) {
      
    }else {
      return  
    }
  }
  render() {
    return (
      <div>
        <List>
          <ListItem
            primaryText={'共发布文章>>>' +this.state.datas.sum+ '>>>篇'}
            leftAvatar={<Avatar src={imgs} />}
          />
          <ListItem
            style={{
              fontFamily: 'time'
            }}
            primaryText={'共有>>>' +this.state.datas.lookPeople+ '>>>人浏览'}
            leftAvatar={<Avatar src={imgs} />}
          />
          <ListItem
            style={{
              fontFamily: 'time'
            }}
            primaryText={'共>>>' +this.state.likeData+ '>>>人点赞'}
            leftAvatar={<Avatar src={imgs} />}
            rightIcon={<FontIcon className="icon-thumbs-o-up" />}
            onClick={this._like}
          />
          <div>
          <Subheader>推荐文章</Subheader>
          {this.state.datas.article.map((item, i) => {
            return <Link
                      key={i} 
                      to={{
                        pathname: '/blog',
                        search: `tab=recommendation&articleID=${item.id}`
                      }}>
                        <ListItem
                          style={{
                            fontFamily: 'time'
                          }}
                          onClick = {() => this._}
                          primaryText={item.title}
                        /> 
                    </Link>
          })}
          </div>
        </List>
      </div>
    );
  }
}

ariticleDate.PropTypes = {
  data: PropTypes.object
}

export default ariticleDate;