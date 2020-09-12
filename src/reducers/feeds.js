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
