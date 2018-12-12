import React, { Component } from 'react';
import './App.css';

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store';
import routes from './routes';

import AlertWrapper from './AlertWrapper'

import {configureFakeBackend } from './helpers/fakeBackend';
configureFakeBackend();


class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div className="App">
                        <AlertWrapper history={history}>
                        {routes}
                        </AlertWrapper>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
