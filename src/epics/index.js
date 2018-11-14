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

const rootEpic = combineEpics(
    pingEpic
)

export default rootEpic;