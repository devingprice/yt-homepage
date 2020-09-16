import { userTypes } from './actionTypes';
import { userService } from '../services';
import { alertActions } from './alert.actions';
import { history } from '../store';

import { newBoard } from './board.actions';
// import { tempColl } from '../data';
import { collectionActions } from '../actions/collection.actions';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    console.log('logging In');
                    collectionActions.getAll();
                    // dispatch(newBoard(tempColl));

                    dispatch(success(user.user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userTypes.LOGIN_REQUEST, user } }
    function success(user) { return { type: userTypes.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userTypes.LOGIN_FAILURE, error } }
}

function logout() {
    return dispatch => {
        dispatch(newBoard({})); //clear board state
        userService.logout(); //remove token
        dispatch(logOut()); //set user state
    };
    function logOut() { return { type: userTypes.LOGOUT } }
    //userService.logout();
    //return { type: userTypes.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userTypes.REGISTER_REQUEST, user } }
    function success(user) { return { type: userTypes.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userTypes.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userTypes.GETALL_REQUEST } }
    function success(users) { return { type: userTypes.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userTypes.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userTypes.DELETE_REQUEST, id } }
    function success(id) { return { type: userTypes.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userTypes.DELETE_FAILURE, id, error } }
}