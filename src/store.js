//import { createStore, applyMiddleware } from 'redux';
//import { createBrowserHistory } from 'history';
//import { connectRouter, routerMiddleware } from 'connected-react-router';

//import rootReducer from './reducers';

// configureStore.js
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from './reducers'

export const history = createBrowserHistory()

const store = createStore(
    createRootReducer(history), // root reducer with router state
    //initialState,
    compose(
        applyMiddleware(
            routerMiddleware(history), // for dispatching history actions
            // ... other middlewares ...
        ),
    ),
)

export default store;
