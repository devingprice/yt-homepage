import {
    sampleFeeds
} from '../data';


export function feeds(state = {
    feeds: sampleFeeds
}, action) {
    switch (action.type) {
        default:
            return state;
    }
}