import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { createStore, combineReducers} from 'redux';
import App from './App';
import {
  Router,
  Route
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  getHomePageData, getBlogData, 
  getLabelData ,getLeaveMessage
} from './redux/reducer'
import registerServiceWorker from './registerServiceWorker';
import createHistory from "history/createBrowserHistory"
const store = createStore(combineReducers({
  getHomePageData, getBlogData, 
  getLabelData, getLeaveMessage
}))
const history = createHistory()

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}/>
      </Router>
    </Provider>
  </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
