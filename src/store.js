import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from "redux-devtools-extension";

import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';

export const history = createBrowserHistory();

const store = createStore(
    rootReducer(history), // root reducer with router state
    //initialState,
    composeWithDevTools( //use compose from 'redux' if dont need tools
        applyMiddleware(
            thunkMiddleware,
            routerMiddleware(history), // for dispatching history actions
            // ... other middlewares ...

        ),
    ),
);

export default store;
