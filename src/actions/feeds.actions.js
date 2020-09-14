import { feedTypes } from './actionTypes';
import { feedService } from '../services';

//export const fetchFeeds = (input) => ({ type: feedTypes.FETCH_FEEDS, channelIds: input });
export const setFeeds = (feeds) => ({ type: feedTypes.SET_FEEDS, feeds: feeds });
export const errorFeeds = (error) => ({ type: feedTypes.ERROR_FEEDS, payload: error });

export function makeFeedsRequest(channelIds) {
    return (dispatch, getState) => {
        console.log(channelIds)
        const staleFeeds = filterToFeedsThatNeedUpdates(getState(), channelIds);
        if(staleFeeds.length === 0) return null;

        //dispatch(fetchFeedsBegin());  this would set the state to loading if I had a reducer for that
        return feedService.fetchAllFeeds(channelIds)
            .then(itemsArray => {
                dispatch(setFeeds(itemsArray));
                return itemsArray;
            })
            .catch(error => {
                    console.log(error)
                    dispatch(errorFeeds(error))
                }
            );
    };
}

function filterToFeedsThatNeedUpdates (state, channelIds) {
    const feeds = state.feeds;
    const now = Date.now();
    const hourInMS = 60*60*1000;

    return channelIds.filter(id => {
        //true means update feed, false means it was updated in past hour
        const exists = feeds[id] !== undefined;
        if(!exists) return true;

        const hourPast = ( feeds[id].lastUpdated - now) > hourInMS;
        if(hourPast) return true;

        return false;
    })
}
