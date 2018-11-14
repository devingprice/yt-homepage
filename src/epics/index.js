import { combineEpics } from 'redux-observable';
import { delay } from 'rxjs/operators/delay';
import { mapTo } from 'rxjs/operators/mapTo'
import { ofType } from 'redux-observable';

const PING = 'PING';
const PONG = 'PONG';

const pingEpic = (action$) => 
    action$.pipe(
        ofType(PING),
        delay(1000),
        mapTo({type:PONG})
    );


const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const LOGINSUCCESS = 'LOGINSUCCESS';
const LOGOUTSUCCESS = 'LOGOUTSUCCESS';

const loginEpic = (action$) =>
    action$.pipe(
        ofType(LOGIN),
        delay(1000),
        mapTo({ type: LOGINSUCCESS })
    );

const logoutEpic = (action$) =>
    action$.pipe(
        ofType(LOGOUT),
        delay(1000),
        mapTo({ type: LOGOUTSUCCESS })
    );

const rootEpic = combineEpics(
    pingEpic,
    loginEpic,
    logoutEpic
)

export default rootEpic;