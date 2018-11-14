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
export default (history) => combineReducers({
    router: connectRouter(history),
    pingReducer
    // rest of your reducers
})