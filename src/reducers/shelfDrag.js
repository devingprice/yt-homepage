import { stateConstants } from '../actions/actionTypes';


export function shelfDrag(state = {
    shelfDrag: false
}, action) {
    switch (action.type) {
        case stateConstants.SET_SHELF_DRAG:
            return { shelfDrag: action.shelfDrag };

        default:
            return state;
    }
}