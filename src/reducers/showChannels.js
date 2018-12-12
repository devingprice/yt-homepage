import { stateConstants } from '../actions/actionTypes';


export function showChannels(state = {
    showChannels: false
}, action) {
    switch (action.type) {
        case stateConstants.SET_SHOW_CHANNELS:
            return { showChannels: action.showChannels };

        default:
            return state;
    }
}