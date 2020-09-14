import { youtubeTypes } from '../actions/actionTypes';

const initialState = {
    searchTerm: "",
    loading: false,
    invalid: false,
    channels: [],
};

export function youtubeSearch(state = initialState, action) {
    switch (action.type) {
        case youtubeTypes.SEARCH_REQUEST:
            return {
                ...state,
                searchTerm: action.searchTerm,
                loading: true,
                invalid: false,
            };

        case youtubeTypes.SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                invalid: false,
                items: action.channels,
            };
        
        case youtubeTypes.SEARCH_FAILURE:
            return {
                ...state,
                loading: false,
                invalid: true,
                channels: []
            };

        default:
            return state;
    }
}
