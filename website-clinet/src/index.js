import React from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import routes from './router';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import { routerStyleContral, noticeListData } from './redux/reducer';

const store = createStore(combineReducers({
  routerStyleContral, noticeListData
}))

ReactDOM.render(
<MuiThemeProvider>
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
</MuiThemeProvider>,
document.getElementById('root'));
registerServiceWorker();
