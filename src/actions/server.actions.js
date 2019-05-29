import { serverConstants } from './actionTypes';
import { collectionService } from '../helpers/collection.service';

export const serverActions = {
    create,
    getAllForUser
};

function create(collectionName) {
    console.log('created action for create');
    return dispatch => {
        console.log('1');
        dispatch(request({ collectionName }));
        console.log('2');
        collectionService.create(collectionName)
            .then(
                collectionRes => {
                    console.log('received collection response from server');
                    console.log(collectionRes);

                    dispatch(success(collectionRes));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(collectionName) { return { type: serverConstants.CREATE_REQUEST, collectionName } }
    function success(collectionRes) { return { type: serverConstants.CREATE_SUCCESS, collectionRes } }
    function failure(error) { return { type: serverConstants.CREATE_FAILURE, error } }
}

function getAllForUser() {
    console.log('created action for getAllForUser');
    return dispatch => {
        console.log('1');
        dispatch(request({}));
        console.log('2');
        collectionService.getAllForUser()
            .then(
                collectionRes => {
                    console.log('received all users collections response from server');
                    console.log(collectionRes);

                    dispatch(success(collectionRes));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(empty) { return { type: serverConstants.GETALLFORUSER_SUCCESS, empty } }
    function success(collectionRes) { return { type: serverConstants.GETALLFORUSER_SUCCESS, collectionRes } }
    function failure(error) { return { type: serverConstants.GETALLFORUSER_FAILURE, error } }
}