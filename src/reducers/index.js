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
import {hover} from './hover';
import {shelfDrag} from './shelfDrag';
import {showChannels} from './showChannels';




export default (history) => combineReducers({
    router: connectRouter(history),
    ping,
    authentication,
    registration,
    alert,
    board,
    boardOrder,
    panel,
    hover,
    shelfDrag,
    showChannels
})