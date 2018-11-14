import React, { Component } from 'react';
import './App.css';

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            {routes}
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
