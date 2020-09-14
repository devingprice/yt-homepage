import { userTypes } from '../actions/actionTypes';

const initialState = {
    loading: false,
    success: false,
};

export function registration(state = initialState, action) {
    switch (action.type) {
        case userTypes.REGISTER_REQUEST:
            return { loading: true, success: false };
        case userTypes.REGISTER_SUCCESS:
            return { loading: false, success: true };
        case userTypes.REGISTER_FAILURE:
            return { loading: false, success: false };
        default:
            return state
    }
}