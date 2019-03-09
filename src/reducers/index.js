import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import {authentication} from './authentication';
import {registration} from './registration';
import {alert} from './alert.reducer';

import {
    board,
    boardOrder,
    panel
} from './board';
import { collections, collectionOrder, channelList } from './collections.reducer';

import {feeds } from './feeds';

import { settings } from './settings.reducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    authentication,
    registration,
    alert,

    board,
    boardOrder,
    panel,

    collections,
    collectionOrder,
    channelList,

    feeds,
    settings
})