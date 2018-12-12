import { stateConstants } from '../actions/actionTypes';


export function hover(state = {
    hovering: null
}, action) {
    switch (action.type) {
        case stateConstants.SET_HOVER:
            return { hovering: action.hovering };

        default:
            return state;
    }
}