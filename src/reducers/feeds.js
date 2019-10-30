import { feedsConstants } from '../actions/actionTypes';

export function feeds(state = {}, action) {
    switch (action.type) {
        case feedsConstants.SET_FEEDS:
            console.log("set feeds");
            return action.feeds;

        case feedsConstants.ERROR_FEEDS:
            console.log("error in feeds");
            return {};

        default:
            return state;
    }
}


/* TODO: could locally save feeds, with a "requested time" field
 then only update if requestedTime exceeds a threshold
 solves: refreshing page would send a TON of requests to youtube for same info
 */