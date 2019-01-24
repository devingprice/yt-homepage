import {
    sampleFeeds
} from '../data';
import { feedsConstants } from '../actions/actionTypes';


export function feeds(state = {
    feeds: sampleFeeds
}, action) {
    switch (action.type) {
        case feedsConstants.SET_FEEDS:
            console.log("set feeds");
            return { feeds: action.feeds };

        case feedsConstants.ERROR_FEEDS:
            console.log("error in feeds");
            return { feeds: [] };

        default:
            return state;
    }
}