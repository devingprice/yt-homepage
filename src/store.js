import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router';

import { createEpicMiddleware } from 'redux-observable';
import thunkMiddleware from 'redux-thunk';

import rootEpic from './epics';
import rootReducer from './reducers';

export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

const store = createStore(
    rootReducer(history), // root reducer with router state
    //initialState,
    compose(
        applyMiddleware(
            thunkMiddleware,
            epicMiddleware,
            routerMiddleware(history), // for dispatching history actions
            // ... other middlewares ...

        ),
    ),
);
epicMiddleware.run(rootEpic);
export default store;