import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const PING = 'PING';
const PONG = 'PONG';

const pingReducer = (state = { isPinging: false }, action) => {
    switch (action.type) {
        case PING:
            console.log('ping');
            return { isPinging: true };

        case PONG:
            console.log('pong');
            return { isPinging: false };

        default:
            console.log(state);
            return state;
    }
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const LOGINSUCCESS = 'LOGINSUCCESS';
const LOGOUTSUCCESS = 'LOGOUTSUCCESS';

const authDummy = (state = { loading: false, loggedIn: false}, action) => {
    switch (action.type) {
        case LOGIN:
            console.log('login');
            return { loading: true,
                loggedIn: false 
            };

        case LOGOUT:
            console.log('pong');
            return { loading: true,
                loggedIn: true 
            };

        case LOGINSUCCESS:
            return { loading: false,
                loggedIn: true 
            };

        case LOGOUTSUCCESS:
            return { loading: false,
                loggedIn: false
            };

        default:
            console.log(state);
            return state;
    }
}

export default (history) => combineReducers({
    router: connectRouter(history),
    pingReducer,
    authDummy
    // rest of your reducers
})