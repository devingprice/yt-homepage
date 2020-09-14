import { visualTypes } from '../actions/actionTypes';

const initialState = {
    hovering: null,
    draggableShelves: false,
    showChannelPills: false
};

export function visual(state = initialState, action) {
    switch (action.type) {
        case visualTypes.SET_SHELF_DRAG:
            return { ...state, draggableShelves: action.draggableShelves };

        case visualTypes.SET_HOVER:
            return { ...state, hovering: action.hovering };

        case visualTypes.SET_SHOW_CHANNELS:
            return { ...state, showChannelPills: action.showChannelPills };

        default:
            return state;
    }
}