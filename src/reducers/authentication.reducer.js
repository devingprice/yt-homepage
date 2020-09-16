import { userTypes } from '../actions/actionTypes';

const localUser = localStorage.getItem('user') || '{}';
let user = JSON.parse(localUser);

const initialState = {
    loggingIn: false,
    loggedIn: user.id ? true : false,
    user: user || {},
}

//TODO: could not set loggedIn until verify check goes through
//TODO: could store when last token was generated, then check "potentially expired" to guess if valid before setting user

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userTypes.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userTypes.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userTypes.LOGIN_FAILURE:
            return { loggedIn: false, user: {} };
        case userTypes.LOGOUT:
            return { loggedIn: false, user: {} };
        default:
            return state
    }
}