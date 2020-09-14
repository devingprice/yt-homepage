import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';

import { collections, collectionOrder, channelList, collectionsBoard } from './collections.reducer';
import { feeds } from './feeds.reducer';
import { visual } from './visual.reducer';
import { youtubeSearch } from './youtube.reducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    authentication,
    registration,
    alert,

    collections,
    collectionsBoard,
    collectionOrder,
    channelList,

    feeds,
    visual,
    youtubeSearch,
})