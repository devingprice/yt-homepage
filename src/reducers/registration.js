import { userConstants } from '../actions/actionTypes';

const initialState = {
    loading: false,
    success: false,
};

export function registration(state = initialState, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { loading: true, success: false };
        case userConstants.REGISTER_SUCCESS:
            return { loading: false, success: true };
        case userConstants.REGISTER_FAILURE:
            return { loading: false, success: false };
        default:
            return state
    }
}