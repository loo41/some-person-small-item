import React, { Component } from 'react';
import MainLife from './MainLife';
import MainRight from './MainRight';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      homeAccount: null
    }
  }
  _setList = (value) => {
    this.setState({
      homeAccount: value
    })
  }
  render() {
    return (
      <div>
        <main style={{
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}>
          <main style={{
            width: '30%',
            minHeight: '30rem',
          }}
          className="mainleft"
          >
          <MainLife getListLengths={this._setList}></MainLife>
          </main>
            <main style={{
              width: '50%',
              minHeight: '50rem',
              marginLeft: '2rem'
            }}
            className="mainRight"
            >
            <MainRight listLengths={this.state.homeAccount}></MainRight>
          </main>
        </main>
      </div>
    );
  }
}

export default App;
