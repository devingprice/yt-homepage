import { userConstants } from '../actions/actionTypes';

let user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    loggingIn: false,
    loggedIn: user ? true : false,
    user: user || undefined,
}

//TODO: could not set loggedIn until verify check goes through
//TODO: could store when last token was generated, then check "potentially expired" to guess if valid before setting user

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return { loggedIn: false, user: undefined };
        case userConstants.LOGOUT:
            return { loggedIn: false, user: undefined };
        default:
            return state
    }
}