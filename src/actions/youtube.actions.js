import { youtubeConstants } from './actionTypes';
import { youtubeService } from '../services';

export const searchStart = (searchTerm) => ({ type: youtubeConstants.SEARCH_REQUEST, searchTerm});
export const searchSuccess = (channels) => ({ type: youtubeConstants.SEARCH_SUCCESS, channels});
export const searchFailure = (error) => ({ type: youtubeConstants.SEARCH_FAILURE, error});

function isSearchDuplicate (state, searchTerm) {
    const prevSearchTerm = state.searchTerm;
    return searchTerm === prevSearchTerm;
}

export function searchYoutube(searchTerm) {
    return (dispatch, getState) => {
        if (isSearchDuplicate(getState(), searchTerm)){
            console.log(`Already searched for ${searchTerm}`);
            return Promise.resolve();
        }
        
        dispatch(searchStart(searchTerm));
        return youtubeService.search(searchTerm)
            .then(channels => {
                dispatch(searchSuccess(channels));
                return channels;
            })
            .catch(error => {
                console.log(error)
                dispatch(searchFailure(error))
            });
    };
}