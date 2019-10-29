import React, { Component } from 'react';
import { history } from '../store';

import AlertWrapper from './AlertWrapper';
import routes from '../routes/index';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <AlertWrapper history={history}>
                {routes}
                </AlertWrapper>
            </div>
        );
    }
}

export default App;

