const PING = 'PING';
const PONG = 'PONG';

export function ping(state = { isPinging: false }, action) {
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
}