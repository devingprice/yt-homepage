import { feedTypes } from '../actions/actionTypes';

export function feeds(state = {}, action) {
    switch (action.type) {
        case feedTypes.SET_FEEDS:
            console.log("set feeds");
            // TODO: Check that this doesn't update feeds that are not included in action.feeds
            return {
                ...state,
                ...action.feeds,
            }

        case feedTypes.ERROR_FEEDS:
            console.log("error in feeds");
            return state;

        default:
            return state;
    }
}
