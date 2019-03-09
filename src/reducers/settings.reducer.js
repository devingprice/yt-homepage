import { stateConstants } from '../actions/actionTypes';

const initialState = {
    hovering: null,
    draggableShelves: false,
    showChannelPills: false
};

export function settings(state = initialState, action) {
    switch (action.type) {
        case stateConstants.SET_SHELF_DRAG:
            return { ...state, draggableShelves: action.draggableShelves };

        case stateConstants.SET_HOVER:
            return { ...state, hovering: action.hovering };

        case stateConstants.SET_SHOW_CHANNELS:
            return { ...state, showChannelPills: action.showChannelPills };

        default:
            return state;
    }
}