import React, { Component } from 'react';
import Header from './views/header/Header';
import Main from './views/main/index';
import Blog from './views/blog/index';
import Label from './views/label/index';
import Like from './views/like/index';
import LeaveMessage from './views/leaveMessage/index';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Header
            skip={this._changeRouter}
          />
        </header>
        <main>
          <Switch>
            <Route path="/home" component={Main}/>
            <Route path="/blog" component={Blog}/>
            <Route path="/label" component={Label}/>
            <Route path="/like" component={Like}/>
            <Route path="/leaveMessage" component={LeaveMessage}/>
            <Route render={() => (<Redirect to="/home?page=1"/>)} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
