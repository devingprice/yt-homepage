import { combineEpics } from 'redux-observable';
import { delay } from 'rxjs/operators/delay';
import { mapTo } from 'rxjs/operators/mapTo'
import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators/mergeMap'
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

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

//epic
/* https://redux-observable.js.org/docs/basics/Epics.html
mergemap(action=>fetch().pipe(mapTo response))
//action creators
const loginCheckAction = payload => ({
    type: LOGINCHECK, payload:payload
});
const loginFailed = payload => ({
    type: LOGINCHECK, payload: payload
});
*/
const LOGINCHECK = 'LOGINCHECK';
const LOGINCHECKSUCCESS = 'LOGINCHECKSUCCESS';
const LOGINFAILURE = 'LOGINFAILURE';

const loginCheckEpic = (action$) =>
    action$.pipe(
        ofType(LOGINCHECK),
        delay(1000),
        mergeMap(action =>{
            console.log('login check epic');
            if (action.payload.email === "name@email.com"
                & action.payload.password === "password") {
                return Observable.of({ type: LOGINSUCCESS })
            } else {
                return Observable.of({ type: LOGINFAILURE })
            }
        })
    );

const rootEpic = combineEpics(
    pingEpic,
    loginEpic,
    logoutEpic,
    loginCheckEpic
)



export default rootEpic;