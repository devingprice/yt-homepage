import { feedsConstants } from './actionTypes';
import { fetchFeed, fetchAllFeeds } from '../helpers/feedHandler';

//export const fetchFeeds = (input) => ({ type: feedsConstants.FETCH_FEEDS, channelIds: input });
export const setFeeds = (feeds) => ({ type: feedsConstants.SET_FEEDS, feeds: feeds });
export const errorFeeds = (error) => ({ type: feedsConstants.ERROR_FEEDS, payload: error });


export function makeFeedsRequest(channelIds) {
    return dispatch => {
        //dispatch(fetchFeedsBegin());  this would set the state to loading if I had a reducer for that
        return fetchAllFeeds(channelIds)
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

/*
// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function getProducts() {
    return fetch("/products")
        .then(handleErrors)
        .then(res => res.json());
}
*/