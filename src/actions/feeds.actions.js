import { feedsConstants } from './actionTypes';
import { feedService } from '../services';

//export const fetchFeeds = (input) => ({ type: feedsConstants.FETCH_FEEDS, channelIds: input });
export const setFeeds = (feeds) => ({ type: feedsConstants.SET_FEEDS, feeds: feeds });
export const errorFeeds = (error) => ({ type: feedsConstants.ERROR_FEEDS, payload: error });

export function makeFeedsRequest(channelIds) {
    return dispatch => {
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
