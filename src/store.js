import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router';

import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';

export const history = createBrowserHistory();

const store = createStore(
    rootReducer(history), // root reducer with router state
    //initialState,
    compose(
        applyMiddleware(
            thunkMiddleware,
            routerMiddleware(history), // for dispatching history actions
            // ... other middlewares ...

        ),
    ),
);
export default store;
