import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import {ping} from './ping';
import {authentication} from './authentication';
import {registration} from './registration';
import {alert} from './alert.reducer';
import {
    board,
    boardOrder,
    panel
} from './board';

/*
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const LOGINSUCCESS = 'LOGINSUCCESS';
const LOGINFAILURE = 'LOGINFAILURE';
const LOGOUTSUCCESS = 'LOGOUTSUCCESS';

const LOGINCHECK = 'LOGINCHECK';

const authDummy = (state = { loading: false, loggedIn: false}, action) => {
    switch (action.type) {
        case LOGIN:
            console.log('login');
            return { loading: true,
                loggedIn: false 
            };

        case LOGINCHECK:
            console.log('login check');
            return {
                loading: true,
                loggedIn: false
            };

        case LOGOUT:
            console.log('pong');
            return { loading: true,
                loggedIn: true 
            };

        case LOGINSUCCESS:
            console.log('login success');
            return { loading: false,
                loggedIn: true 
            };

        case LOGINFAILURE:
            console.log('login failure');
            return {
                loading: false,
                loggedIn: false
            };
        case LOGOUTSUCCESS:
            console.log('logout succes');
            return { loading: false,
                loggedIn: false
            };

        default:
            console.log(state);
            return state;
    }
}
*/

export default (history) => combineReducers({
    router: connectRouter(history),
    ping,
    //authDummy,
    authentication,
    registration,
    alert,
    board,
    boardOrder,
    panel
    // rest of your reducers
})