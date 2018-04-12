import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {GridList, FontIcon, Chip, Avatar} from 'material-ui';
import {Link} from 'react-router-dom'

class label extends Component {
  constructor(props){
    super(props)
    this.state = {
      allIcon: ['icon-coursera', 'icon-react', 
      'icon-python', 'icon-redux', 'icon-vuejs']
    }
  }
  _iconName = () => {
    let allIconLength = this.state.allIcon.length
    return this.state.allIcon[
      Math.floor(Math.random() * allIconLength)
    ]
  }
  _handleClick = () => {

  }
  render() {
    const {labels, chipStyle} = this.props
    return (
      <div >
      <GridList
        cellHeight={50}
      >
        {labels.map((title, i) => (
        <Link to={{
          pathname: '/label',
          search: `tab=${title}&page=1`,
          state: {tab: title, page: 1}
        }}
        key={i}
        >
        <Chip
          className="indexLabelStyle"
          onClick={this._handleClick}
          style={chipStyle}>
          <Avatar
            style={{backgroundColor: 'white',}}
            icon={<FontIcon className={this._iconName()} />} />
        {title}
        </Chip>
        </Link>
        ))}
      </GridList>
      </div>
    );
  }
}

label.PropTypes = {
  labels: PropTypes.array
}

export default label;